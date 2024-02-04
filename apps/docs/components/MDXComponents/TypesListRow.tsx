import { PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { media } from "styles/utils";

const Root = styled.div`
	min-height: 64px;
	display: grid;
	grid-template-columns: 1fr;
	border-bottom: 1px solid ${({ theme }) => theme.border};

	div {
		padding: 1rem 0;
		display: flex;
	}

	code {
		margin-top: 2px;
		align-self: flex-start;
	}
	
	${media('xs')} {
		grid-template-columns: minmax(10rem, 0.35fr) 1fr;
	}
`;

const Content = styled.div`
	p {
		margin: 0;
		font-size: 1rem;
		line-height: 1.75rem;
		font-variation-settings: 'wght' ${({ theme }) => theme.fontWeights.primary.medium};
		color: ${({ theme }) => theme.on_alt};
	}
`;

export const TypesListRow = ({ children, types = [] }: PropsWithChildren<{ types: string[] }>) => {
	return (
		<Root>
			<div>
				{types.map((type) => <code key={type}>{type}</code>)}
			</div>
			<Content>
				{children}
			</Content>
		</Root>
	)
}
