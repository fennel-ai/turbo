import styled from "@emotion/styled";
import type { NavigationTree } from "lib/utils";
import Link from "next/link";

type Props = {
	items: NavigationTree
}

const Nav = styled.nav`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	position: sticky;
	top: 8rem;
	align-self: flex-start;
`;

const Section = styled.ul`
	margin: 0;
	list-style: none;
	padding-left: 0px;
`;

const SectionTitle = styled.li`
	font-size: 1.25rem;
	line-height: 2.5rem;
	font-variation-settings: 'wght' 600;
	opacity: 0.64;
	cursor: pointer;

	&:hover {
		opacity: 1;
	}
`;

const InnerPages = styled.ul`
	list-style: none;
	padding-left: 2rem;
	border-left: 1px solid #E2E1EF;
	height: 0;
	overflow: hidden;
`;

const Navigation = ({ items }: Props) => (
	<aside>
		<Nav>
			{
				items.map((section) => (
					<Section key={section.slug}>
						<SectionTitle>{section.title}</SectionTitle>
						<InnerPages>
							{section.pages.map(({ title, slug }) => (
								<li key={slug}><Link aria-label={title} href={`/${section.slug}/${slug}`}>{title}</Link></li>
							))}
						</InnerPages>
					</Section>
				))
			}
		</Nav>
	</aside>
);

export default Navigation;