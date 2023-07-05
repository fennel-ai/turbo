import styled from '@emotion/styled';
import { useRef } from 'react';
import { media, rgba } from 'styles/utils';
import { IconButton, PillButton, Masthead } from 'ui';
import SearchIcon from 'ui/icons/search.svg';

import Container from 'components/Container';
import { DocSearch } from 'components/DocSearch';
import type { DocSearchHandle } from 'components/DocSearch';
import MobileToolbar from 'components/MobileToolbar';
import { useRouter } from 'next/router';

const Root = styled.div`
	grid-column: span 12;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1;
	background-color: ${({ theme }) => rgba(theme.background, 0.72)};
`;

const Backdrop = styled.div`
	z-index: -1;
	&::before,
	&::after {
		content: "";
		position: absolute;
		inset: -1px 0px -60%;
		pointer-events: none;
		user-select: none;
	}

	&::before {
		backdrop-filter: blur(20px) saturate(1.4);
		-webkit-mask-image: linear-gradient(to bottom, black 6rem, transparent);
		mask-image: linear-gradient(to bottom, black 6rem, transparent);

		${media('md')} {
			-webkit-mask-image: linear-gradient(to bottom, black 7,5rem, transparent);
			mask-image: linear-gradient(to bottom, black 7,5rem, transparent);
		}
		
		${media('lg')} {
			-webkit-mask-image: linear-gradient(to bottom, black 4.5rem, transparent);
			mask-image: linear-gradient(to bottom, black 4.5rem, transparent);
		}
	}
`;

const Wrapper = styled(Container)`
	position: relative;
	height: 3rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	z-index: 1;

	${media('md')} {
		height: 4.5rem;
	}
`;

const SearchWrapper = styled.div`
	padding: 0 2rem; 
	display: none;
	
	${media('md')} {
		display: block;
		width: 31.5rem;
	}
	
	${media('lg')} {
		width: 36rem;
	}
	
	${media('xl')} {
		width: 39.75rem;
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
	gap: 1.5rem;
`;

const SearchButton = styled(IconButton)`
	${media('md')} {
		display: none;
	}
`;

const DemoButton = styled(PillButton)`
	display: none;

	${media('sm')} {
		display: flex;
	}
`;

const Border = styled(Container)`
	display: none;	
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 1px;

	& > div {
		width: 100%;
		height: 100%;
		background-color: ${({ theme }) => rgba(theme.on_alt, 0.06)};
	}

	${media('lg')} {
		display: block;
	}
`;

const Header = () => {
	const docSearch = useRef<DocSearchHandle>(null);
	const openSearch = () => docSearch.current ? docSearch.current.open() : null;

	const router = useRouter();

	return (
		<Root>
			<Backdrop />
			<Wrapper>
				<Brand name="Documentation" />
				<SearchWrapper>
					<DocSearch
						ref={docSearch}
						appId={process.env.NEXT_PUBLIC_ALGOLIA_ID!}
						indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX!}
						apiKey={process.env.NEXT_PUBLIC_ALGOLIA_KEY!}
					/>
				</SearchWrapper>
				<Actions>
					<SearchButton ariaLabel="Search" icon={SearchIcon} onClick={openSearch} />
					<DemoButton
						icon={null}
						size="large"
						invert
						onClick={() => router.push("https://fennel.ai/get-a-demo")}
					>
						Request a demo
					</DemoButton>
				</Actions>
			</Wrapper>
			<Border>
				<div />
			</Border>
			<MobileToolbar />
		</Root>
	);
};

export default Header;