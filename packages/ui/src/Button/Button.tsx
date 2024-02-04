import { MouseEventHandler } from 'react';
import styled from '@emotion/styled';
import { stateLayer } from 'styles/utils';

import * as VARIANTS from './variants';

export type ButtonProps = {
	ariaLabel?: string;
	className?: string;
	color?: 'primary' | 'neutral';
    direction?: 'row' | 'row-reverse';
    disabled?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
    icon?: JSX.Element;
	label: string;
    size?: keyof typeof VARIANTS.SIZE;
    shape?: keyof typeof VARIANTS.SHAPE;
	type?: 'button' | 'submit';
    variant?: keyof typeof VARIANTS.STYLE;
};

const Root = styled.button<{ 
    color: 'primary' | 'neutral', 
    direction: 'row' | 'row-reverse',
    disabled: boolean;
    hasIcon: boolean,
    size: keyof typeof VARIANTS.SIZE,
    shape: keyof typeof VARIANTS.SHAPE,
    variant: keyof typeof VARIANTS.STYLE 
}>`
	border: 0;
    padding: 0;
	position: relative;
	display: flex;
	flex-direction: ${props => props.direction};
	align-items: center;
	justify-content: center;
	gap: 0.25rem;
	font-size: 0.875rem;
	line-height: 1.5rem;
    font-variation-settings: "wght" 500;
	cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
	user-select: none;
	overflow: hidden;
	text-decoration: none;
	z-index: 0;

    ${props => !props.disabled ? stateLayer(props.variant === 'glass' ? 0.04 : 0) : null};
    ${(props) => VARIANTS.STYLE[props.variant]}
    ${(props) => VARIANTS.SHAPE[props.shape]}
    ${(props) => VARIANTS.SIZE[props.size]};
`;

export const Button = ({
	ariaLabel,
	className,
	color = 'neutral',
    disabled = false,
    direction = 'row',
    icon,
	label,
	onClick,
    size = 'large',
    shape = 'rounded',
    variant = 'flat',
	type = 'button'
}: ButtonProps) => {
	return (
        <Root 
            className={className} 
            aria-label={ariaLabel} 
            color={color} 
            disabled={disabled}
            direction={direction}
            hasIcon={!!icon}
            onClick={!disabled ? onClick : undefined} 
            shape={shape} 
            size={size}
            type={type}
            variant={variant} 
        >
			{label}
            {icon || null}
		</Root>
	);
};