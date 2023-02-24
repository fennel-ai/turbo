import styled from '@emotion/styled';
import { get, media } from 'styles/utils';
import { Button, IconButton, Searchbar } from 'ui';
import SearchIcon from 'ui/icons/search.svg';

import Container from './Container';
import Masthead from './Masthead';

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
	border-bottom: 1px solid ${get('border')};
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
	return (
		<Root>
			<Wrapper>
				<Masthead />
				<SearchWrapper>
					<Searchbar />
				</SearchWrapper>
				<Actions>
					<SearchButton icon={SearchIcon} />
					<DemoButton label="Request a demo" variant="pill" color="neutral" />
				</Actions>
			</Wrapper>
		</Root>
	);
};

export default Header;