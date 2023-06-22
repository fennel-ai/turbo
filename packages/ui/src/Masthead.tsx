import styled from '@emotion/styled';
import { media } from 'styles/utils';

import Logo from '../icons/logo.svg';

const Root = styled.div`
	display: flex;
	align-items: center;
	user-select: nome;
	gap: 0.5rem;

	${media('md')} {
		gap: 1rem;
	}

	& svg {
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
		font-variation-settings: "wght" ${({ theme }) => theme.fontWeights.bold};

		${media('md')} {
			font-size: 1.25rem;
			line-height: 1.5rem;
		}
	}
`;

export const Masthead = ({ className, name = 'Fennel' }: { className?: string, name?: string }) => {
	return (
		<Root className={className}>
			<Logo />
			<h2>{name}</h2>
		</Root>
	)
}
