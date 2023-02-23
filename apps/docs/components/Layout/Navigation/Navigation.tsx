import styled from "@emotion/styled";
import type { NavigationTree } from "lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { media, get } from 'styles/utils';

import NavigationSection from "./NavigationSection";

type Props = {
	items: NavigationTree
}

const Root = styled.aside`
	display: none;

	${media('lg')} {
		display: block;
		grid-column: span 3;
	}
`;

const Nav = styled.nav`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	position: sticky;
	top: 8rem;
	align-self: flex-start;
`;

const PageItem = styled.li<{ active: boolean, fade: boolean }>`
	font-size: 1.125rem;
	line-height: 2rem;
	color: ${(props) => props.active ? get('primary.accent') : get('text-alt')};
	font-variation-settings: 'wght' 500;
	opacity: ${({ fade }) => fade ? 0.64 : 1};
	display: flex;
	align-items: stretch;

	&:hover {
		color: ${props => props.active ? get('primary.accent') : get('text')};
	}

	& > a {
		text-decoration: none;
		color: inherit;
		flex: 1;
	}
`;

const Navigation = ({ items }: Props) => {
	const router = useRouter();
	return (
		<Root>
			<Nav>
				{
					items.map((section) => {
						const sectionActive = section.slug === router.query.slug![0];
						return (
							<NavigationSection 
								expand={sectionActive} 
								key={section.slug}
								title={section.title} 
								href={`/${section.slug}/${section.pages[0].slug}`}
							>
								{section.pages.map(({ title, slug }) => {
									const href = `/${section.slug}/${slug}`;
									const active = router.asPath === href;
									return (
										<PageItem active={active} fade={sectionActive && !active} key={slug}><Link aria-label={title} href={href}>{title}</Link></PageItem>
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