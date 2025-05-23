import styled from '@emotion/styled';
import { Container } from 'ui';
import Logo from 'ui/icons/logo.svg';
import { media } from 'styles/utils';

const Root = styled.footer`
	background-color: ${({ theme }) => theme.surface};
	border-top: 1px solid ${({ theme }) => theme.border};
	padding: 2.5rem 0;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	
	${media('sm')} {
		padding: 5rem 0;
	}
`;

const Wrapper = styled(Container)`
	display: flex;
	align-items: center;

	${media('sm', 'max')} {
		justify-content: center;
	}
`;

const Brand = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	
	svg {
		width: 1.5rem;
		height: 1.5rem;
	}

	& h3 {
		margin: 0;
		font-size: 1rem;
		line-height: 1.5rem;
	}
`;

const Credit = styled(Wrapper)`
	& p {
		margin: 0;
		font-size: 0.875rem;
		line-height: 1rem;
		opacity: 64%;
		color: ${({ theme }) => theme.on_alt};
		font-variation-settings: "wght" 500;
	}
`;

export const Footer = () => {
	return (
		<Root>
			<Wrapper>
				<Brand>
					<Logo />
					<h3>Fennel</h3>
				</Brand>
			</Wrapper>
			<Credit>
				<p>© 2023 Fennel · All Rights Reserved</p>
			</Credit>
		</Root>
	);
};