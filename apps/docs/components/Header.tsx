import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import { get, media } from 'styles/utils';
import { Button, IconButton } from 'ui';
import SearchIcon from 'ui/icons/search.svg';

import Container from './Container';
import { DocSearch } from './DocSearch';
import type { DocSearchHandle } from './DocSearch';
import Masthead from './Masthead';
import { AnimatePresence } from 'framer-motion';
import RequestDemoModal from './RequestDemoModal';

const Root = styled(Container)`
	grid-column: span 12;
	position: sticky;
	top: 0;
	left: 0;
	z-index: 1;
	background-color: rgba(255, 255, 255, 0.85);
	backdrop-filter: blur(16px);
`;

const Wrapper = styled.div`
	height: 4.5rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	
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

const DemoButton = styled(Button)`
	display: none;

	${media('sm')} {
		display: block;
	}
`;

const Header = () => {
	const [openRequestModal, setOpenRequestModal] = useState(false);

	const docSearch = useRef<DocSearchHandle>(null);
	const openSearch = () => docSearch.current ? docSearch.current.open() : null;
	return (
		<Root>
			<Wrapper>
				<Masthead />
				<SearchWrapper>
					<DocSearch
						ref={docSearch}
						appId={process.env.NEXT_PUBLIC_ALGOLIA_ID!}
						indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX!}
						apiKey={process.env.NEXT_PUBLIC_ALGOLIA_KEY!}
					/>
				</SearchWrapper>
				<Actions>
					<SearchButton icon={SearchIcon} onClick={openSearch} />
					<DemoButton label="Request a demo" variant="pill" color="neutral" onClick={() => setOpenRequestModal(true)} />
				</Actions>
			</Wrapper>
			<AnimatePresence>
				{
					openRequestModal ? (
						<RequestDemoModal onClose={() => setOpenRequestModal(false)} />
					) : null
				}
			</AnimatePresence>
		</Root>
	);
};

export default Header;