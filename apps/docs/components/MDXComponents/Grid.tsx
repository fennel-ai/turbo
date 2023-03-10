import { PropsWithChildren } from "react";
import styled from "@emotion/styled";

const Root = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 2rem;
`;

export const Grid = ({ children }: PropsWithChildren) => {
	return (
		<Root>
			{children}
		</Root>
	);
};