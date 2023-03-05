import { PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { media } from "styles/utils";

const Root = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	border-bottom: 1px solid rgba(${({ theme }) => theme.ref.grey['100']}, 8%);

	div {
		padding: 1rem 0;
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
		font-variation-settings: 'wght' ${({ theme }) => theme.fontWeights.medium};
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
