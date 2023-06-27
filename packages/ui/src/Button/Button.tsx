import { MouseEventHandler } from 'react';
import styled from '@emotion/styled';
import { stateLayer } from 'styles/utils';

type Props = {
	ariaLabel?: string;
	className?: string;
	color?: 'primary' | 'neutral';
	onClick?: MouseEventHandler<HTMLButtonElement>;
	label: string;
	type?: 'button' | 'submit';
};

const Root = styled.button<{ color: 'primary' | 'neutral' }>`
	border: 0;
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	padding: 0 1rem;
	font-size: 0.875rem;
	line-height: 1rem;
	height: 2.5rem;
	cursor: pointer;
	user-select: none;
	overflow: hidden;
	text-decoration: none;
	border-radius: 0.5rem;
	z-index: 0;
	background-color: ${({ color, theme }) => theme[color].accent};
	color: ${({ color, theme }) => theme[color].on};

	${stateLayer()};
`;

export const Button = ({
	ariaLabel,
	className,
	color = 'neutral',
	label,
	onClick,
	type = 'button'
}: Props) => {
	return (
		<Root className={className} aria-label={ariaLabel} color={color} onClick={onClick} type={type}>
			{label}
		</Root>
	);
};