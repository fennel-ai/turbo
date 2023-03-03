import styled from '@emotion/styled';
import Logo from 'ui/icons/logo.svg';

const Root = styled.div`
	display: flex;
	align-items: center;
	color: ${({ theme }) => theme.primary.accent};
	gap: 1rem;

	& p {
		font-size: 1.25rem;
		line-height: 1.5rem;
		letter-spacing: -0.5px;
		color: ${({ theme }) => theme.text};
		font-variation-settings: "wght" ${({ theme }) => theme.fontWeights.bold};
	}
`;

const Masthead = () => {
	return (
		<Root>
			<Logo width={44} height={24} />
			<p>Documentation</p>
		</Root>
	)
}

export default Masthead;