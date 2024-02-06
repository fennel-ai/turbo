import styled from '@emotion/styled';
import { media } from 'styles/utils';

import Logo from '../icons/logo_emblem.svg';
import LogoFull from '../icons/logo_full.svg';
import LogoDarkFull from '../icons/logo_full_dark.svg';
import { useTheme } from '@emotion/react';

const Root = styled.div`
	display: flex;
	align-items: center;
	user-select: nome;
	gap: 0.5rem;

	${media('md')} {
		gap: 1rem;
	}

	& h2 {
		font-size: 1rem;
		line-height: 1.5rem;
		letter-spacing: -0.5px;
		margin: 0;
		font-variation-settings: "wght" ${({ theme }) => theme.fontWeights.primary.bold};

		${media('md')} {
			font-size: 1.25rem;
			line-height: 1.5rem;
		}
	}
`;

const HalfLogo = styled.a`
& svg {
	width: 28px;
	height: 28px;

	${media('md')} {
		width: 40px;
		height: 40px;
	}
}
`

const FullLogo = styled.a`
	& svg {
		width: 4.75rem;
		height: 100%;
	}
`

export const Masthead = ({ className, name }: { className?: string, name?: string }) => {
	const theme = useTheme();
	const isThemeDark = theme.type === "dark";
	return (
		<Root className={className}>
			{name ? (<>
			<HalfLogo href='https://fennel.ai'>
				<Logo />
			</HalfLogo>
			<h2>{name}</h2>
			</>
			) :
			<FullLogo href='https://fennel.ai'>
				{isThemeDark ? <LogoDarkFull/> : <LogoFull/>}
			</FullLogo>
			}
		</Root>
	)
}
