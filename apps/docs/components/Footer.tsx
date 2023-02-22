import styled from '@emotion/styled';
import { get } from 'styles/utils';

import Container from './Container';

const Root = styled.footer`
	height: 6.5rem;
	border-top: 1px solid ${get('border')};
`;

const Wrapper = styled(Container)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 100%;
`;

const Footer = () => {
	return (
		<Root>
			<Wrapper>
				<p>© 2023</p>
			</Wrapper>
		</Root>
	);
};

export default Footer;