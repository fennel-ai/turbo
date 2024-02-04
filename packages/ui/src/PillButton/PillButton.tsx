import type { HTMLAttributes, PropsWithChildren } from 'react';
import type { FunctionInterpolation } from '@emotion/react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import InternalLinkIcon from '../../icons/arrow-narrow-up-right.svg';
import { media, stateLayer } from 'styles/utils';

interface Props extends HTMLAttributes<HTMLButtonElement> {
	icon?: JSX.Element | null;
	invert?: boolean;
	size?: 'large' | 'small';
}

const DEFAULT_ICON = <InternalLinkIcon />;

const SIZE: Record<'small' | 'large', FunctionInterpolation<{ size: 'small' | 'large', hasIcon: boolean }>> = {
	'small': () => css`
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		height: 2rem;
	`, 
	'large': () => css`
		padding-left: 1rem;
		padding-right: 1rem;
		height: 2.5rem;
	`,
}

const Root = styled.button<{ size: 'small' | 'large', hasIcon: boolean, invert: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.25rem;
	font-size: 0.875rem;
	line-height: 1.5rem;
	background: none;
	backdrop-filter: blur(0.5rem);
	color: ${({ invert, theme }) => theme[invert ? 'background' : 'on']};
	border-radius: 99px;
	cursor: pointer;
	user-select: none;
	overflow: hidden;

    & svg {
        flex-shrink: 0;
    }

	${({ invert, theme }) => stateLayer(invert ? 0.80 : 0.04, theme.on)};
	${SIZE.small}

	${media('md')} {
		${({ size }) => SIZE[size]};
	}
`;

export const PillButton = (props: PropsWithChildren<Props>) => {
	const { 
		className, 
		children, 
		icon = DEFAULT_ICON, 
		invert = false, 
		onClick, 
		size = 'small', 
		style 
	} = props;

	return (
		<Root 
			className={className} 
			hasIcon={!!icon} 
			invert={invert}
			onClick={onClick} 
			style={style} 
			size={size}
		>
			{children}
			{icon}
		</Root>
	);
};