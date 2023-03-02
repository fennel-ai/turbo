import styled from "@emotion/styled";
import type { NavigationTree } from "lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { media } from 'styles/utils';

import NavigationSection from "./NavigationSection";
import NavigationItem from "./NavigationItem";

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
	position: sticky;
	top: 8rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	align-self: flex-start;
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
								href={section.pages[0].slug}
							>
								{section.pages.map(({ title, slug, status }) => {
									const active = router.asPath === `/${slug}`;
									return (
										<NavigationItem active={active} status={status} fade={sectionActive && !active} key={slug}><Link aria-label={title} href={slug}>{title}</Link></NavigationItem>
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