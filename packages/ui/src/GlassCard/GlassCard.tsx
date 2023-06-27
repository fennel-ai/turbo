import { PropsWithChildren, useEffect, forwardRef, useRef, HTMLAttributes } from "react";
import { useSharedRef } from "hooks";
import styled from '@emotion/styled';

import { Card } from '../Card';
import { rgba } from "styles/utils";

const Root = styled(Card)`
	--x: calc((var(--mouse-x) - var(--pos-x)) * 1px);
	--y: calc((var(--mouse-y) - var(--pos-y)) * 1px);

	background-color: ${({ theme }) => theme.border};
	user-select: none;
	contain: strict;
	transition: box-shadow 200ms ease-out, transform 200ms ease;
	border-radius: 1.5rem;

	&::before {
		content: "";
		pointer-events: none;
		user-select: none;
		position: absolute;
		inset: 0px;
		border-radius: inherit;
		opacity: var(--global-shimmer-alpha);
		transition: opacity 400ms ease;
		will-change: background, opacity;
		z-index: 1;
		background: radial-gradient(800px circle at var(--x) var(--y), ${({ theme }) => rgba(theme.on, 0.3)}, transparent 40%);
	}

	&::after {
		content: "";
		position: absolute;
		z-index: 2;
		inset: 1px;
		border-radius: calc(1.5rem - 1px);
		pointer-events: none;
		user-select: none;
		opacity: 0;
		will-change: background, opacity;
		contain: strict;
		background: radial-gradient(400px circle at $x $y, ${({ theme }) => rgba(theme.on, 0.04)}, transparent);
		transition: opacity 400ms ease 0s;
	}

	&:hover::after {
		opacity: 0.4;
	}
`;

const Content = styled.div`
	position: absolute;
	inset: 1px;
	background-color: ${({ theme }) => theme.surface};
	border-radius: calc(1.5rem - 1px);
	z-index: 1;
`;

export const GlassCard = forwardRef(({
	children,
	className,
	style,
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>, ref) => {
	const el = useRef<HTMLDivElement>(null);
	const sharedRef = useSharedRef(null, [el, ref]);

	useEffect(() => {
		if (el.current) {
			const box = el.current.getBoundingClientRect();
			el.current.style.setProperty('--pos-x', `${box.left}`);
			el.current.style.setProperty('--pos-y', `${box.top}`);

		}
	}, [])

	return (
		<Root ref={sharedRef} className={className} style={style}>
			<Content>
				{children}
			</Content>
		</Root>
	);
});

GlassCard.displayName = 'GlassCard';