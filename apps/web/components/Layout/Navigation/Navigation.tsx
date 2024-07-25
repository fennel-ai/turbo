import styled from "@emotion/styled";
import type { NavigationTree } from "lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { media, rgba } from 'styles/utils';

import NavigationItem from "./NavigationItem";
import { useLayoutContext } from "../useLayoutContext";
import { useCallback, useEffect, useRef, useState } from "react";

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
	height: 400px;
	overflow-y: scroll;
`;

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const getFormattedDate = (date: string) => {
	const dateFormat = new Date(date);
	return `${months[dateFormat.getMonth()]} ${dateFormat.getDate()}, ${dateFormat.getFullYear()}`
}

const Navigation = ({ navigation }: Props) => {
	const { items, active } = navigation;
	const [navbarHeight, setNavbarHeight] = useState(0);
	const navbarRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
        const activeNavItem = document.getElementById("active");
        if (activeNavItem && navbarRef.current) {
            let _navbarHeight = navbarHeight;
            if(!_navbarHeight) {
                _navbarHeight = navbarRef.current.getBoundingClientRect().height;
                setNavbarHeight(_navbarHeight);
            }
            const activeNavItemRect = activeNavItem.getBoundingClientRect();
            navbarRef.current!.scrollTop += activeNavItemRect.top - _navbarHeight / 2 + activeNavItemRect.height / 2;
        }
    }, [active])

	return (
		<Root>
			<Nav ref={navbarRef}>
				{
					items.map((item) => {
						const itemActive = active === item;
						return (
							<NavigationItem active={itemActive} status={'published'} fade={itemActive} key={item} id={itemActive ? "active" : ""}><Link aria-label={item} href={'#' + item}
							
							onClick={() => {
									document.getElementById(active)?.scrollIntoView();
							}}
							>{getFormattedDate(item)}</Link></NavigationItem>
						)
					})
				}
			</Nav>
		</Root>
	);
}

export default Navigation;