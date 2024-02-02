import { PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { media } from "styles/utils";


const DividerRoot = styled.div`
	display: grid;
    width: 100%;
	grid-template-columns: 1fr;
	grid-gap: 2rem;

	${media('sm')} {
		grid-template-columns: repeat(12, 1fr);
	}
`;

const RightSectionWrapper = styled.div`
	grid-column: span 12;
    ${media('md')} {
        grid-column: span 7;
		position: sticky;
        top: 8rem;
        align-self: start;
	}
`

const LeftSectionWrapper = styled.div`
	grid-column: span 12;
    ${media('md')} {
        grid-column: span 5;
		position: sticky;
        top: 8rem;
        align-self: start;
	}
`


export const Divider = ({children}: PropsWithChildren) => {
	return (
		<DividerRoot>
			{children}
		</DividerRoot>
	);
}

export const RightSection = ({children}: PropsWithChildren) => {
	return (
		<RightSectionWrapper>
			{children}
		</RightSectionWrapper>
	)
}

export const LeftSection = ({children}: PropsWithChildren) => {
	return (
		<LeftSectionWrapper>
			{children}
		</LeftSectionWrapper>
	)
}