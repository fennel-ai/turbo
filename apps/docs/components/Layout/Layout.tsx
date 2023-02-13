import { ReactNode } from "react";
import styled from '@emotion/styled';
import { media } from "styles/utils";

import type { NavigationTree } from "lib/utils";

import Navigation from "./Navigation";
import Container from "../Container";

type Props = {
	children: ReactNode,
	navigation: NavigationTree
}

const Root = styled(Container)`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 2rem;
	padding-top: 2rem;
	padding-bottom: 5rem;

	${media('xs')} {
		grid-template-columns: repeat(8, 1fr);
	}

	${media('md')} {
		grid-template-columns: repeat(12, 1fr);
		padding-top: 2.5rem;
	}

	${media('lg')} {
		padding-top: 3.5rem;
		padding-bottom: 7.5rem;
	}

	& > main {
		/** Content Styles */
		h1, h2, h3, h4, h5, h6 {
			font-family: "Addington CF", serif;
			font-weight: 500;
		}

		h2, h3 {
			margin-top: 2rem;

			${media('sm')} {
				margin-top: 2.5rem;
			}
		}

		& > p {
			margin: 0;
			font-size: 1.125rem;
			line-height: 2rem;
			margin-bottom: 1.5rem;
			font-variation-settings: "wght" 500;

			${media('sm')} {
				font-size: 1.25rem;
				line-height: 2.5rem;
			}
		}

		li {
			font-size: 1.125rem;
			line-height: 2rem;
			font-variation-settings: "wght" 500;
			margin-bottom: 1.5rem;
		}

		strong {
			font-variation-settings: "wght" 700;
		}

		/** Grid style */
		grid-column: span 4;
		${media('xs')} {
			grid-column: span 8;
		}

		${media('md')} {
			grid-column: span 12;
		}

		${media('lg')} {
			grid-column: span 8;
		}
	}
`;

const Layout = ({ children, navigation }: Props) => {
	return (
		<Root>
			<Navigation items={navigation} />
			<main>
				{children}
			</main>
		</Root>
	)
};

export default Layout;
