import styled from '@emotion/styled';
import { useRef } from 'react';
import { media } from 'styles/utils';
import { IconButton, LinkButton, Masthead } from 'ui';
import SearchIcon from 'ui/icons/search.svg';

import Container from 'components/Container';
import { DocSearch } from 'components/DocSearch';
import type { DocSearchHandle } from 'components/DocSearch';
import MobileToolbar from 'components/MobileToolbar';
import { useRouter } from 'next/router';

const Root = styled(Container)`
	grid-column: span 12;
	position: sticky;
	top: 0;
	left: 0;
	z-index: 1;
	background-color: rgba(255, 255, 255, 0.89);
	backdrop-filter: blur(16px);
`;

const Wrapper = styled.div`
	height: 3rem;
	display: flex;
	align-items: center;
	justify-content: space-between;

	${media('md')} {
		height: 4.5rem;
	}
	
	${media('lg')} {
		border-bottom: 1px solid rgba(${({ theme }) => theme.ref.grey['100']}, 8%);
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
	& svg {
		color: ${({ theme }) => theme.primary.accent};
	}

	& h2 {
		color: ${({ theme }) => theme.text};
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

const DemoButton = styled(LinkButton)`
	display: none;

	${media('sm')} {
		display: flex;
	}
`;

const Header = () => {
	const docSearch = useRef<DocSearchHandle>(null);
	const openSearch = () => docSearch.current ? docSearch.current.open() : null;

	const router = useRouter();

	return (
		<Root>
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
						color="invert"
						onClick={() => router.push("https://fennel.ai/get-a-demo")}
					>
						Request a demo
					</DemoButton>
				</Actions>
			</Wrapper>
			<MobileToolbar />
		</Root>
	);
};

export default Header;