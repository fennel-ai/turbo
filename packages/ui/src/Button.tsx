import styled from '@emotion/styled';
import { MouseEventHandler } from 'react';
import { get } from 'styles/utils';

type Props = {
	className?: string;
	color?: 'primary' | 'primary-alt' | 'neutral';
	onClick?: MouseEventHandler<HTMLButtonElement>;
	label: string;
	variant?: 'rounded' | 'pill';
	type?: 'button' | 'submit';
};

const Root = styled.button<{ color: Props['color'], variant: Props['variant'] }>`
	border: 0;
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	padding: 0 ${({ variant }) => variant == 'rounded' ? 0.75 : 1}rem;
	font-size: 0.875rem;
	line-height: 1rem;
	height: 2.5rem;
	cursor: pointer;
	border-radius: ${({ variant }) => get(`button.${variant}.radius`)};
	background-color: ${({ color }) => get(`button.default.${color}.bg`)};
	font-variation-settings: "wght" ${get('fontWeights.medium')};
	color: ${({ color }) => get(`button.default.${color}.fg`)};
	box-shadow: ${({ color, variant }) => variant === 'rounded' ? get(`button.${color}.shadow`) : null};
	overflow: hidden;

	&::before {
		content: "";
		position: absolute;
		inset: 0;
		background-color: currentColor;
		opacity: ${get(`state-layer.default`)};
		pointer-events: none;
	}

	&:hover::before {
		opacity: ${get(`state-layer.hover`)};
	}
	
	&:active::before {
		opacity: ${get(`state-layer.active`)};
	}
`;

export const Button = ({
	className,
	color = 'neutral',
	label,
	onClick,
	variant = 'rounded',
	type = 'button'
}: Props) => {
	return (
		<Root className={className} color={color} onClick={onClick} variant={variant} type={type}>
			{label}
		</Root>
	);
};