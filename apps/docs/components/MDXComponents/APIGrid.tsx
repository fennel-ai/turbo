import { PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { media } from "styles/utils";


const CodeRoot = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 2rem;

	${media('sm')} {
		grid-template-columns: repeat(12, 1fr);
	}
`;

const CodeWrapper = styled.div`
	grid-column: span 7;
	position: sticky;
    top: 0px;
    align-self: start;
`

const InfoWrapper = styled.div`
	grid-column: span 5;
`


export const APIGrid = ({children}: PropsWithChildren) => {
	return (
		<CodeRoot>
			{children}
		</CodeRoot>
	);
}

export const CodeBlock = ({children}: PropsWithChildren) => {
	return (
		<CodeWrapper>
			{children}
		</CodeWrapper>
	)
}

export const InfoBlock = ({children}: PropsWithChildren) => {
	return (
		<InfoWrapper>
			{children}
		</InfoWrapper>
	)
}