import { Children, PropsWithChildren, ReactElement, ReactNode } from "react";
import styled from '@emotion/styled';
import { get } from "styles/utils";

const Root = styled.table`
	border-collapse: separate;
	margin: 1rem 0 2rem 0;

	& thead {
		tr {
			text-align: left;
			box-shadow: 0px 2px 0px ${get("border")};

			th {
				padding: 1rem;
				border-collapse: separate;
				font-size: 1.125rem;
				line-height: 1.5rem;
				color: ${({ theme }) => theme["text-alt"] };

				&:first-of-type {
					padding-left: 0;
				}

				&:last-of-type {
					padding-right: 0;
				}
			}
		}
	}

	& tbody {
		tr td {
			padding: 1rem; 
			font-size: 1rem;
			line-height: 1.5rem;
			font-variation-settings: "wght" ${get("fontWeights.medium")};
			vertical-align: top;

			&:first-of-type {
				padding-left: 0;
			}

			&:last-of-type {
				padding-right: 0;
			}
		}
	}
`;

const renderTable = (children: ReactElement) => Children.map(children, (child: ReactElement, i) => {
	switch (child.type) {
		case 'thead': {
			return (
				<thead key={i}>
					{renderTable(child.props.children)}
				</thead>
			)
		}
		case 'tbody': {
			return (
				<tbody key={i}>
					{renderTable(child.props.children)}
				</tbody>
			)
		}
		case 'tr': {
			return (
				<tr key={i}>
					{renderTable(child.props.children)}
				</tr>
			)
		}
		case 'td': {
			return (
				<td key={i}>
					{child.props.children}
				</td>
			);
		}
		case 'th': {
			return (
				<th key={i}>
					{child.props.children}
				</th>
			);
		}
		default: {
			return null;
		}
	}
});

export const Table = (props: { children: ReactElement }) => {
	return (
		<Root>
			{renderTable(props.children)}
		</Root>
	)
};
