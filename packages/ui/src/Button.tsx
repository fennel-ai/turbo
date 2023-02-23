import styled from '@emotion/styled';
import { get } from 'styles/utils';

type Props = {
	className?: string;
	color?: 'primary' | 'primary-alt' | 'neutral',
	label: string,
	variant?: 'rounded' | 'pill'
};

const Root = styled.button<{ color: Props['color'], variant: Props['variant'] }>`
	border: 0;
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 0.5rem;
	padding: 0 ${({ variant }) => variant == 'rounded' ? 0.75 : 1}rem;
	font-size: 0.875rem;
	line-height: 1rem;
	height: 2.5rem;
	cursor: pointer;
	border-radius: ${({ variant }) => get(`button.${variant}.radius`)};
	background-color: ${({ color }) => get(`button.default.${color}.bg`)};
	color: ${({ color }) => get(`button.default.${color}.fg`)};
	box-shadow: ${({ color }) => get(`button.${color}.shadow`)};
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
	variant = 'rounded'
}: Props) => {
	return (
		<Root className={className} color={color} variant={variant}>
			{label}
		</Root>
	);
};