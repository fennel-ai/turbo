import styled from "@emotion/styled";
import type { NavigationTree } from "lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { media } from 'styles/utils';

import NavigationSection from "./NavigationSection";
import NavigationItem from "./NavigationItem";

type Props = {
	items: NavigationTree
	isAPI?: boolean;
	active?: string;
}

const Root = styled.aside`
	display: none;
	${media('lg')} {
		display: block;
		grid-column: span 1;
		max-height: calc(100vh - 8rem);
		overflow-y: auto;
		overflow-x: hidden;
		position: sticky;
		top: 8rem;
		padding-bottom: 2rem;
	}
`;

const Nav = styled.nav`
	position: sticky;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	align-self: flex-start;
`;

const Navigation = ({ items, isAPI, active }: Props) => {
	const router = useRouter();
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
									const activePath = active ? active : `/${slug === '/' ? '' : slug}`;
									const activeItem = isAPI ? slug === activePath : router.asPath === activePath;
									return (
										<NavigationItem active={activeItem} status={status} fade={!active} key={slug}><Link aria-label={title} href={isAPI ? '#'+slug : slug}>{title}</Link></NavigationItem>
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