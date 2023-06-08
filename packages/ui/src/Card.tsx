import { ForwardedRef, HTMLAttributes, PropsWithChildren, StyleHTMLAttributes, forwardRef } from 'react';
import styled from '@emotion/styled';

const Root = styled.div`
	background-color: rgba(240, 240, 245, 0.5);
	backdrop-filter: blur(1rem);
	border-radius: 1.5rem;
	display: flex;
	flex-direction: column;
`;

export const Card = forwardRef(({ className, children, style }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>, ref: ForwardedRef<HTMLDivElement>) => {
	return (
		<Root className={className} ref={ref} style={style}>
			{children}
		</Root>
	);
});

Card.displayName = 'Card';