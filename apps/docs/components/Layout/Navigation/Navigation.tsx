import styled from "@emotion/styled";
import type { NavigationTree } from "lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { media } from 'styles/utils';

import NavigationSection from "./NavigationSection";
import NavigationItem from "./NavigationItem";
import { useEffect, useState } from "react";

type Props = {
	items: NavigationTree
	isAPI?: boolean;
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
		padding-top: 7.5rem;
		padding-bottom: 4rem;
	}
`;

const Nav = styled.nav`
	position: sticky;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	align-self: flex-start;
`;

const Navigation = ({ items, isAPI }: Props) => {
	const router = useRouter();

	const [currentActive, setCurrentActive] = useState('')

    useEffect(() => {
        const handleScroll = () => {
          let current = ''
          for (const section of items) {
			for (const page of section.pages) { 
            	const slug = page.slug as string;
            	const element = document.getElementById(slug)
				if (element && element.getBoundingClientRect().top < 200) {
					current = slug
				}
			}
          }
          setCurrentActive(current)
        }
		if(isAPI){
        	handleScroll()
        	window.addEventListener('scroll', handleScroll, { passive: true })
		}	
        return () => {
			if(isAPI){
          		window.removeEventListener('scroll', handleScroll)
			}
        }
      }, [])
	return (
		<Root>
			<Nav>
				{
					items.map((section) => {
						return (
							<NavigationSection 
								expand
								key={section.slug}
								title={section.title} 
								href={section.pages[0].slug}
								isAPI={isAPI}
							>
								{section.pages.map(({ title, slug, status }) => {
									const activePath = currentActive ? currentActive : `/${slug === '/' ? '' : slug}`;
									const activeItem = isAPI ? slug === activePath : router.asPath === activePath;
									return (
										<NavigationItem active={activeItem} status={status} fade={!activeItem} key={slug}><Link aria-label={title} href={isAPI ? '#'+slug : slug}>{title}</Link></NavigationItem>
									)
								})}
							</NavigationSection>
						)
					})
				}
			</Nav>
		</Root>
	);
}

export default Navigation;