import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

const Root = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 1rem;
	background-color: #AEAAE4; /** TODO */
	box-shadow: 0px 0px 0px 3px #EBEBFA;
	color: rgba(255, 255, 255, 0.64);
	width: 3rem;
	height: 3rem;

	& svg {
		filter: drop-shadow(0px 4px 8px rgba(59, 48, 126, 0.24));
		width: 1.5rem;
		height: 1.5rem;
	}
`;

export const IconPuck = ({ children }: PropsWithChildren) => (
	<Root>
		{children}
	</Root>
);