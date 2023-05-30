import { PropsWithChildren, StyleHTMLAttributes } from 'react';
import styled from '@emotion/styled';

type Props = {
	className?: string;
	style?: StyleHTMLAttributes<HTMLDivElement>;
}

const Root = styled.div`
	background-color: rgba(240, 240, 245, 0.5);
	backdrop-filter: blur(1rem);
	border-radius: 1.5rem;
	display: flex;
	flex-direction: column;
`;

export const Card = ({ className, children, style }: PropsWithChildren<Props>) => {
	return (
		<Root className={className} style={style}>
			{children}
		</Root>
	);
};