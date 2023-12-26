import { PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { media } from "styles/utils";

const Root = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 2rem;

	${media('sm')} {
		grid-template-columns: repeat(2, 1fr);
	}
`;

export const Grid = ({ children }: PropsWithChildren) => {
	return (
		<Root>
			{children}
		</Root>
	);
};