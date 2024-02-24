import { useContext, useRef } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { media, rgba } from 'styles/utils';
import { version } from 'contentlayer/generated';
import { IconButton, Masthead, Button } from 'ui';
import SearchIcon from 'ui/icons/search.svg';
import GitHubIcon from 'ui/icons/github.svg';
import SunIcon from 'ui/icons/sun.svg';
import MoonIcon from 'ui/icons/moon.svg';

import Container from 'components/Container';
import { DocSearch } from 'components/DocSearch';
import type { DocSearchHandle } from 'components/DocSearch';
import MobileToolbar from 'components/MobileToolbar';
import { DarkThemeContext } from 'context/CustomTheme/provider';

const Root = styled.div`
	grid-column: span 12;
	position: fixed;
	top: 0;
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

const SearchButton = styled(IconButton)`
	${media('md')} {
		margin-left: auto;
		display: none;
	}
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
	gap: 2rem;
`

const NavWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 1rem;
`

const DemoButtons = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	${media('md')} {
		margin-left: auto;
	}

	& path {
		fill: ${props => props.theme.on_alt};
	}

`

const NavButton = styled(Button)<{active: boolean}>`
	font-weight: 500;
	color: ${({ theme, active }) => active ? theme.primary.accent: theme.on };
	height: 3.5rem;
	border-radius: 0;
	border-bottom: ${props => props.active && `2px solid ${props.theme.primary.accent}`};
`


const Header = () => {
	const docSearch = useRef<DocSearchHandle>(null);
	const openSearch = () => docSearch.current ? docSearch.current.open() : null;

	const router = useRouter();
	const isAPI = router.pathname.includes("/api-reference/");

	const navigateTo = (route: string) => {
		router.push(route)
	}

	const {isDarkTheme, setTheme} = useContext(DarkThemeContext);

	return (
		<Root>
			<Wrapper>
			<LinkWrapper>
				<Brand/>
				<NavWrapper>
					<NavButton variant='ghost' label="Documentation" active={!isAPI} onClick={()=>navigateTo('/')}/>
					<NavButton variant='ghost' label="API Reference" active={isAPI} onClick={()=>navigateTo('/api-reference')}/>
				</NavWrapper>
				</LinkWrapper>
				<SearchWrapper>
					<DocSearch
						ref={docSearch}
						appId={process.env.NEXT_PUBLIC_ALGOLIA_ID!}
						indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX!}
						apiKey={process.env.NEXT_PUBLIC_ALGOLIA_KEY!}
					/>
				</SearchWrapper>
				<Actions>
                    <select>
                        <option value="">Latest</option>
                        {
                            version.versions!.map(({ name }) => {
                                return <option value={name}>{name}</option>
                            })
                        }
                    </select>
					<SearchButton ariaLabel="Search" icon={SearchIcon} onClick={openSearch} />
					<DemoButtons>
						<IconButton size="small" icon={isDarkTheme ? SunIcon : MoonIcon} onClick={() => {setTheme(!isDarkTheme)}}/>
					<a href="https://github.com/fennel-ai/client/">
						<DemoButton
							size="small"
							label="Github"
							variant="outline"
							icon={<GitHubIcon/>}
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
			</Wrapper>
			<MobileToolbar />
		</Root>
	);
};

export default Header;