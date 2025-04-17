import { ChangeEvent, ChangeEventHandler, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { media, rgba } from 'styles/utils';
import { version as versionManifest } from 'contentlayer/generated';

import { IconButton, Masthead, Button } from 'ui';
import * as BUTTON_VARIANTS from 'ui/src/Button/variants';
import DropdownIcon from 'ui/icons/dropdown.svg';
import GitHubIcon from 'ui/icons/github.svg';
import GridIcon from 'ui/icons/grid.svg';
import SunIcon from 'ui/icons/sun.svg';
import MoonIcon from 'ui/icons/moon.svg';

import Container from 'components/Container';
import { DocSearch } from 'components/DocSearch';
import type { DocSearchHandle } from 'components/DocSearch';
import MobileToolbar from 'components/MobileToolbar';
import { DarkThemeContext } from 'context/CustomTheme/provider';
import { ThemeProvider } from '@emotion/react';
import Link from 'next/link';
import ChevronRightIcon from 'ui/icons/chevron-right-small.svg';
import * as themes from 'styles';

const Root = styled.div`
	grid-column: span 12;
	position: sticky;
	top: 2rem;
	left: 0;
	right: 0;
	z-index: 3;
	background-color: ${({ theme }) => theme.glass};
	border-bottom: 1px solid ${({ theme }) => rgba(theme.on_alt, 0.06)};
	backdrop-filter: blur(20px) saturate(1.4);
`;

const Wrapper = styled(Container)`
	max-width: 100%;
	position: relative;
	height: 3rem;
	display: flex;
	align-items: center;
	z-index: 3;

	${media('md')} {
		height: 3.5rem;
	}
`;

const SearchWrapper = styled.div`
	padding: 0 2rem; 
	display: none;
	
	
	${media('md')} {
		display: flex;
		flex: 1;
		width: 30rem;
	}
`;

const Brand = styled(Masthead)`
	padding-top: 4px;
	position: relative;

	& svg {
		color: ${({ theme }) => theme.primary.accent};
	}

	& h2 {
		color: ${({ theme }) => theme.on};
	}
`;

const Actions = styled.div`
	display: flex;
	align-items: center;
	flex: 1;
	gap: 1.5rem;
	justify-content: flex-end;
`;

const DemoButton = styled(Button)`
	display: none;

	${media('sm')} {
		display: flex;
	}
`;

const LinkWrapper = styled.div`
	display: flex;
	align-items: center;
	flex: 1;
	${media('md')} {
	gap: 2rem;
	}
`

const NavWrapper = styled.div`
	display: none;

	${media('sm')} {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 1rem;
	}
`

const NavWrapperMobile = styled.div`
	padding-left:0.25rem;
	display: flex;
	gap: 0.25rem;
	align-items: center;

	${media('sm')} {
		display: none;
	}
`

const DemoButtons = styled.div`
	align-items: center;
	gap: 1rem;
	display: none;
	${media('md')} {
		display: flex;
		margin-left: auto;
	}

	& path {
		fill: ${props => props.theme.on_alt};
	}

`

const NavButton = styled(Button) <{ active: boolean }>`
	font-weight: 500;
	color: ${({ theme, active }) => active ? theme.primary.accent : theme.on};
	height: 3.5rem;
	border-radius: 0;
	border-bottom: ${props => props.active && `2px solid ${props.theme.primary.accent}`};
`

const MobileNavText = styled.div<{ active: boolean }>`
	font-weight: 500;
	color: ${({ theme, active }) => active ? theme.primary.accent : rgba(theme.on_alt, 0.6)};

	${media('sm')} {
		display: none;
	}
`

const ThemeChangeButton = styled(IconButton)`
	margin-left: 0.5rem;
	${media('md')} {
		display: none;
	}
`

const AnnouncementBanner = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
	display: inline-flex;
    background-color: ${({ theme }) => theme.primary.accent};
	align-items: center;
	justify-content: center;
	height: 2rem;
	color: ${({ theme }) => theme.surface};
	z-index: 999;
	font-size: ${({ theme }) => theme.body.small?.fontSize};

	& a {
	color: ${({ theme }) => theme.primary.on};
	}

	${media('md')} {
		font-size: ${({ theme }) => theme.body.default?.fontSize};
	}
`

const VersionDropdown = styled.div<{ children: any }>`
    position: relative;
    padding: 0 !important;
    display: flex;

    & > select {
        flex: 1;
        border-radius: 0.5rem;
        appearance: none;
        user-select: none;
        cursor: pointer;
        font: inherit;
        letter-spacing: inherit;
        color: currentcolor;
        padding-left: 0.75rem;
        padding-right: 2rem;
        border: 0px;
        box-sizing: content-box;
        background: none;
        height: 1.4375em;
        margin: 0px;
        -webkit-tap-highlight-color: transparent;
        display: block;
        min-width: 0px;
        width: 100%;
        height: 100%;
    }

    & svg {
        position: absolute;
        top: 50%;
        right: 0.5rem;
        transform: translate3d(0%, -50%, 0);
        pointer-events: none;
    }

    ${({ theme }) => BUTTON_VARIANTS.STYLE.outline({ disabled: false, theme })};
    ${() => BUTTON_VARIANTS.SIZE.small()};
    ${() => BUTTON_VARIANTS.SHAPE.rounded({ direction: 'row', hasIcon: false, size: 'small' })};
`;

function VersionSelector({ onChange, value }: { onChange: ChangeEventHandler<HTMLSelectElement>, value: string }) {
	return versionManifest.versions?.length ? (
		<VersionDropdown>
			<select onChange={onChange} value={value}>
				<option value="main">Latest</option>
				{
					versionManifest.versions.map(({ name }) => (
						<option key={name} value={name}>{name}</option>
					))
				}
			</select>
			<DropdownIcon />
		</VersionDropdown>
	) : null
}

const Header = ({ version }: { version: string }) => {
	const docSearch = useRef<DocSearchHandle>(null);
	const openSearch = () => docSearch.current ? docSearch.current.open() : null;

	const router = useRouter();
	const isAPI = router.pathname.includes("/api-reference");

	const handleChangeVersion = (e: ChangeEvent<HTMLSelectElement>) => {
		let newVersion = e.target.value;
		if (newVersion === version) {
			return;
		}

		router.push({
			pathname: router.pathname,
			query: { slug: [newVersion, ...(router.query.slug as string[] ?? [])].filter((p) => p !== 'main' && p !== version) },
		})
	}

	useEffect(() => {
		router.prefetch("/api-reference")
		router.prefetch("/")
	}, [])

	const handleNavigate = useCallback((pathname: string) => {
		router.push({
			pathname,
			query: {
				slug: [version].filter(p => p !== 'main')
			}
		}, undefined, { shallow: true })
	}, [version, router])

	const searchParameters = useMemo(() => ({
		facetFilters: `version:${version}`
	}), [version]);

	const { isDarkTheme, setTheme } = useContext(DarkThemeContext);

	const navItems = [
		{ name: 'API', path: '/api-reference/[[...slug]]', active: isAPI },
		{ name: 'Docs', path: '/[[...slug]]', active: !isAPI }
	]

	return (<>
			<ThemeProvider theme={themes.light}>
				<AnnouncementBanner><p> 🎉 Fennel is now part of Databricks. <Link style={{
					"display": "inline-flex",
					"gap": 0.25,
					"alignItems": "center",
					"justifyContent":"center"
				}} href="https://www.databricks.com/blog/fennel-joins-databricks-democratize-access-machine-learning">Learn More<ChevronRightIcon/></Link></p></AnnouncementBanner>
			</ThemeProvider>
		<Root>
			<Wrapper>
				<LinkWrapper>
					<Brand />
					<NavWrapperMobile>
						{navItems.sort(item => item.active ? -1 : 1)  // Sorting to put the active item first
							.map(item => (
								<MobileNavText key={item.name} active={item.active} onClick={() => handleNavigate(item.path)}>
									{item.name}
								</MobileNavText>
							))
						}
					</NavWrapperMobile>
					<NavWrapper>
						<NavButton variant='ghost' label="Documentation" active={!isAPI} onClick={() => handleNavigate('/[[...slug]]')} />
						<NavButton variant='ghost' label="API Reference" active={isAPI} onClick={() => handleNavigate('/api-reference/[[...slug]]')} />
					</NavWrapper>
				</LinkWrapper>
				<SearchWrapper>
					<DocSearch
						ref={docSearch}
						searchParameters={searchParameters}
						appId={process.env.NEXT_PUBLIC_ALGOLIA_ID!}
						indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX!}
						apiKey={process.env.NEXT_PUBLIC_ALGOLIA_KEY!}
					/>
				</SearchWrapper>
				<Actions>
					<VersionSelector
						onChange={handleChangeVersion}
						value={version}
					/>
					{/** NOTE: This <p> is used by the algolia scraper to facet based on version */}
					<p id="version-num" style={{ display: 'none' }}>{version}</p>
					<DemoButtons>
						<IconButton size="small" icon={isDarkTheme ? SunIcon : MoonIcon} onClick={() => { setTheme(!isDarkTheme) }} />
						<a href="https://github.com/fennel-ai/client/">
							<DemoButton
								size="small"
								label="Github"
								variant="outline"
								icon={<GitHubIcon />}
							/>
						</a>
						<a href="https://fennel.ai/get-a-demo">
							<DemoButton
								size="small"
								label="Request a demo"
								variant="outline"
							/>
						</a>
					</DemoButtons>
				</Actions>
				<ThemeChangeButton size="small" icon={isDarkTheme ? SunIcon : MoonIcon} onClick={() => { setTheme(!isDarkTheme) }} />
			</Wrapper>
			<MobileToolbar openSearch={openSearch} />
		</Root>
		</>
	);
};

export default Header;