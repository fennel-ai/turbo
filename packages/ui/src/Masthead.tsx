import styled from '@emotion/styled';
import { media } from 'styles/utils';

import Logo from '../icons/logo.svg';

const Root = styled.div`
	display: flex;
	align-items: center;
	user-select: nome;
	color: ${({ theme }) => theme.primary.accent};
	gap: 0.5rem;

	${media('md')} {
		gap: 1rem;
	}

	& svg {
		color: theme.get(primary);
		width: 28px;
		height: 28px;

		${media('md')} {
			width: 40px;
			height: 40px;
		}
	}

	& h2 {
		font-size: 1rem;
		line-height: 1.5rem;
		letter-spacing: -0.5px;
		margin: 0;
		color: ${({ theme }) => theme.text};
		font-variation-settings: "wght" ${({ theme }) => theme.fontWeights.bold};

		${media('md')} {
			font-size: 1.25rem;
			line-height: 1.5rem;
		}
	}
`;

export const Masthead = ({ name = 'Fennel' }: { name?: string }) => {
	return (
		<Root>
			<Logo />
			<h2>{name}</h2>
		</Root>
	)
}
