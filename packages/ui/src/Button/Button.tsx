import { MouseEventHandler } from 'react';
import styled from '@emotion/styled';
import { stateLayer } from 'styles/utils';

import * as VARIANTS from './variants';

type Props = {
	ariaLabel?: string;
	className?: string;
	color?: 'primary' | 'neutral';
	onClick?: MouseEventHandler<HTMLButtonElement>;
	label: string;
    size?: keyof typeof VARIANTS.SIZE;
    shape?: keyof typeof VARIANTS.SHAPE;
	type?: 'button' | 'submit';
    variant?: keyof typeof VARIANTS.STYLE;
};

const Root = styled.button<{ 
    color: 'primary' | 'neutral', 
    size: keyof typeof VARIANTS.SIZE,
    shape: keyof typeof VARIANTS.SHAPE,
    variant: keyof typeof VARIANTS.STYLE 
}>`
	border: 0;
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	padding: 0 0.75rem;
	font-size: 0.875rem;
	line-height: 1.5rem;
    font-variation-settings: "wght" 500;
	cursor: pointer;
	user-select: none;
	overflow: hidden;
	text-decoration: none;
	z-index: 0;

    ${props => stateLayer(props.variant === 'glass' ? 0.04 : 0)};
    ${(props) => VARIANTS.STYLE[props.variant]}
    ${(props) => VARIANTS.SHAPE[props.shape]}
    ${(props) => VARIANTS.SIZE[props.size]};
`;

export const Button = ({
	ariaLabel,
	className,
	color = 'neutral',
	label,
	onClick,
    size = 'large',
    shape = 'rounded',
    variant = 'flat',
	type = 'button'
}: Props) => {
	return (
        <Root 
            className={className} 
            aria-label={ariaLabel} 
            color={color} 
            onClick={onClick} 
            shape={shape} 
            size={size}
            type={type}
            variant={variant} 
        >
			{label}
		</Root>
	);
};