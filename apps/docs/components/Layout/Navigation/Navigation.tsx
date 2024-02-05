import styled from "@emotion/styled";
import type { NavigationTree } from "lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { media } from 'styles/utils';

import NavigationSection from "./NavigationSection";
import NavigationItem from "./NavigationItem";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

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
	const containerRef = useRef<HTMLElement>(null);
	const activeRef = useRef<HTMLLIElement>(null);


    useEffect(() => {
        const handleScroll = () => {
          let current = ''
          for (const section of items) {
			for (const page of section.pages) { 
            	const slug = page.slug.replace('api-reference/', '') as string;
            	const element = document.getElementById(slug)
				if (element && element.getBoundingClientRect().top < 200) {
					current = slug
					router.push('/api-reference/'+slug, undefined, { shallow: true })
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

	  useEffect(() => {
		if(containerRef?.current && activeRef?.current){
			const topScroll = activeRef.current.offsetTop;
			containerRef.current.scrollTop = topScroll;
		}
	  }, [activeRef.current])

	const onAPIRefClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, slug: string) => {
		if(isAPI){
			e.preventDefault();
			document.getElementById(slug)?.scrollIntoView({behavior: 'instant'})
			router.push('/api-reference/'+slug, undefined, { shallow: true })
		}
	}
	return (
		<Root ref={containerRef}>
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
								{section.pages.map(({ title, slug, status }) => {
									const formattedSlug  = isAPI ? slug.replace('api-reference/', '') : slug
									const activePath = currentActive ? currentActive : `/${slug === '/' ? '' : slug}`;
									const activeItem = isAPI ? formattedSlug === activePath : router.asPath === activePath;
									return (
										<NavigationItem active={activeItem} ref={activeItem ? activeRef : null} status={status} fade={!activeItem} key={slug}><Link shallow={isAPI} aria-label={title} href={isAPI ?  '#' : formattedSlug} onClick={(e) => onAPIRefClick(e, formattedSlug)}>{title}</Link></NavigationItem>
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