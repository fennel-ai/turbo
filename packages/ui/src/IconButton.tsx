import { ComponentType, MouseEventHandler } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { get } from 'styles/utils';

type SizeVariant = "small" | "medium" | "large";

const size_variants: Record<SizeVariant, any> = {
	small: css`
		width: 1.5rem;
		height: 1.5rem;

		svg {
			width: 1rem;
			height: 1rem;
		}
	`,
	medium: css`
		width: 2rem;
		height: 2rem;

		svg {
			width: 1.25rem;
			height: 1.25rem;
		}
	`,
	large: css`
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 0.75rem;

		svg {
			width: 1.5rem;
			height: 1.5rem;
		}
	`,
};

const Root = styled.button<{size: SizeVariant}>`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 0.5rem;
	background: none;
	cursor: pointer;
	color: currentColor;
	overflow: hidden;
	${({ size }) => size_variants[size]};

	& svg {
		flex-shrink: 0;
	}

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

type Props = {
	className?: string,
	icon: ComponentType,
	onClick: MouseEventHandler<HTMLButtonElement>,
	size?: SizeVariant
}

export const IconButton = ({ className, icon: Icon, onClick, size = "medium" }: Props) => {
	return (
		<Root className={className} size={size} onClick={onClick}>
			<Icon />
		</Root>
	);
};