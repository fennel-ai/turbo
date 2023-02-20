import styled from '@emotion/styled';
import { get } from 'styles/utils';

import Container from './Container';

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

const Header = () => {
	return (
		<Root>
			<Wrapper>
				<p>Documentation</p>
				<button>Request a demo</button>
			</Wrapper>
		</Root>
	);
};

export default Header;