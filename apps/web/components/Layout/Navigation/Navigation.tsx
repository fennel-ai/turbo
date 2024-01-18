import styled from "@emotion/styled";
import type { NavigationTree } from "lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { media } from 'styles/utils';

import NavigationItem from "./NavigationItem";
import { useLayoutContext } from "../useLayoutContext";

type Props = {
	navigation: NavigationTree
}

const Root = styled.aside`
	display: none;
	${media('lg')} {
		padding-top: 4rem;
		display: block;
		grid-column: span 3;
	}
`;

const Nav = styled.nav`
	position: sticky;
	top: 8rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	align-self: flex-start;
`;

const getFormattedDate = (date: string) => {
	const dateFormat = new Date(date);
	return dateFormat.toDateString();
}

const Navigation = ({ navigation }: Props) => {
	const {items, active} = navigation;
	return (
		<Root>
			<Nav>
				{
					items.map((item) => {
						const itemActive = active === item;
						return (
							<NavigationItem active={itemActive} status={'published'} fade={itemActive} key={item}><Link aria-label={item} href={'#'+item}>{getFormattedDate(item)}</Link></NavigationItem>
						)
					})
				}
			</Nav>
		</Root>
	);
}

export default Navigation;