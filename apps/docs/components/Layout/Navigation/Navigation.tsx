import styled from "@emotion/styled";
import type { NavigationPage, NavigationTree } from "lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { media } from 'styles/utils';

import NavigationSection from "./NavigationSection";
import NavigationItem from "./NavigationItem";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { throttle } from "lodash";

type Props = {
	items: NavigationTree
	isAPI?: boolean;
	navRoute?: string;
    version: string;
}

const Root = styled.aside`
	display: none;
	${media('lg')} {
		display: block;
		grid-column: span 1;
		max-height: calc(100vh - 1rem);
		overflow-y: auto;
		overflow-x: hidden;
		position: sticky;
		top: 0rem;
		padding-top: 2rem;
		padding-bottom: 4rem;
	}
`;

const Nav = styled.nav`
	position: sticky;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	align-self: flex-start;
    scroll-behavior: smooth;
`;

const Navigation = ({ items, isAPI }: Props) => {
    const router = useRouter();
    const [currentActive, setCurrentActive] = useState('')
    const navbarRef = useRef<HTMLDivElement>(null)
    const [navbarHeight, setNavbarHeight] = useState(0);

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
    }, [currentActive])

    const renderItem = useCallback((title: string, slug: string, status: NavigationPage['status'], isActive: boolean) => {
        return (
            <NavigationItem id={isActive ? "active" : ""} active={isActive} status={status} fade={!isActive} key={slug}>
                <Link 
                    shallow={isAPI} 
                    aria-label={title} 
                    href={slug}
                    onClick={() => {
                        if (isAPI) {
                            document.getElementById(slug)?.scrollIntoView();
                        }
                    }}
                >
                        {title}
                </Link>
            </NavigationItem>
        )
    }, [isAPI]);

    const handlePopState = useCallback(() => {
        const path = window.location.pathname;
        setCurrentActive(path.replace(/\/docs\/api-reference\/?/g, ''));
    }, []);

    useEffect(() => {
        if (isAPI) {
            window.addEventListener('popstate', handlePopState);
        }

        return () => {
            if (isAPI) {
                window.removeEventListener('popstate', handlePopState)
            }
        }
    }, [isAPI, handlePopState]);

	return (
		<Root id="sidenav" ref={navbarRef}>
			<Nav>
				{
					items.map((section) => {
						return (
							<NavigationSection 
								key={section.slug}
								title={section.title} 
								href={section.pages[0].slug}
								isAPI={isAPI}
							>
                                {
                                    section.pages.map(item => {
                                        const activePath = currentActive ? currentActive : `/${item.slug === '/' ? '' : item.slug}`;
                                        return renderItem(
                                            item.title,
                                            item.slug,
                                            item.status,
                                            isAPI ? item.slug === currentActive : router.asPath === activePath
                                        );
                                    })
                                }
							</NavigationSection>
						)
					})
				}
			</Nav>
		</Root>
	);
}

export default Navigation;