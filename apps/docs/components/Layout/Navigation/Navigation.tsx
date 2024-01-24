import styled from "@emotion/styled";
import type { NavigationTree } from "lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { media } from 'styles/utils';

import NavigationSection from "./NavigationSection";
import NavigationItem from "./NavigationItem";
import { useLayoutContext } from "../useLayoutContext";

type Props = {
	items: NavigationTree
}

const Root = styled.aside`
	display: none;
	${media('lg')} {
		display: block;
		grid-column: span 1;
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

const Navigation = ({ items }: Props) => {
	const router = useRouter();
	const ctx = useLayoutContext();

	return (
		<Root>
			<Nav>
				{
					items.map((section) => {
						return (
							<NavigationSection 
								expand={true}
								key={section.slug}
								title={section.title} 
								href={section.pages[0].slug}
							>
								{section.pages.map(({ title, slug, status }) => {
									const active = router.asPath === `/${slug === '/' ? '' : slug}`;
									return (
										<NavigationItem active={active} status={status} fade={!active} key={slug}><Link aria-label={title} href={slug}>{title}</Link></NavigationItem>
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