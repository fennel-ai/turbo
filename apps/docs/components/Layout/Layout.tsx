import { ReactNode } from "react";
import styled from '@emotion/styled';

import type { NavigationTree } from "lib/utils";

import Navigation from "./Navigation";
import Container from "../Container";

type Props = {
	children: ReactNode,
	navigation: NavigationTree
}

const Root = styled(Container)`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	gap: 2rem;
	padding-top: 3.5rem;
	padding-bottom: 7.5rem;

	& > aside {
		display: none;
		@media (min-width: )
		grid-column: span 3;
	}

	& > main {
		grid-column: span 8;
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
