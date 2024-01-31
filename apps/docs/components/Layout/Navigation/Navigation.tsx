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
		max-height: 90vh;
		overflow-y: auto;
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
									const activeItem = router.asPath === activePath
									return (
										<NavigationItem active={activeItem} status={status} fade={!active} key={slug}><Link aria-label={title} href={'#'+slug}>{title}</Link></NavigationItem>
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