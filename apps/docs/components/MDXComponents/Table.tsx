import { PropsWithChildren } from "react";
import styled from '@emotion/styled';
import { get } from "styles/utils";

const Root = styled.table`
	border-collapse: separate;
	border-spacing: 1rem 0px;

	& thead {
		tr {
			text-align: left;
			box-shadow: 0px 2px 0px ${get("border")};

			th {
				padding: 1rem 0;
				border-collapse: separate;
				font-size: 1.125rem;
				line-height: 1.5rem;
				color: ${({ theme }) => theme["text-alt"] };
			}
		}
	}

	& tbody {
		tr td {
			padding: 1rem 0; 
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
