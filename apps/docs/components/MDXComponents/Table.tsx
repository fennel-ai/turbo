import { PropsWithChildren } from "react";
import styled from '@emotion/styled';
import { get } from "styles/utils";

const Root = styled.table`
	border-collapse: separate;
	border-spacing: 0px;

	& thead {
		tr {
			text-align: left;

			th {
				padding: 1rem 1.5rem;
				border-collapse: separate;
				border-bottom: 2px solid ${get("border")};
				font-size: 1.125rem;
				line-height: 1.5rem;
			}
		}
	}

	& tbody {
		tr td {
			padding: 1rem 1.5rem; 
			font-size: 1rem;
			line-height: 1.5rem;
			font-variation-settings: "wght" ${get("fontWeights.medium")};
			vertical-align: top;
		}
	}
`;

export const Table = ({ children }: PropsWithChildren) => {
	return (
		<Root>{children}</Root>
	)
};
