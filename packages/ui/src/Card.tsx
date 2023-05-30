import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

const Root = styled.div`
	background-color: rgba(240, 240, 245, 0.5);
	backdrop-filter: blur(1rem);
	border-radius: 1.5rem;
	display: flex;
	flex-direction: column;
`;

export const Card = ({ children }: PropsWithChildren) => {
	return (
		<Root>
			{children}
		</Root>
	);
};