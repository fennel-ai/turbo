import styled from "@emotion/styled";
import type { NavigationTree } from "lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { color, palette } from 'styles/utils';

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
	color: ${palette('text')};
	font-size: 1.25rem;
	line-height: 2.5rem;
	font-variation-settings: 'wght' 600;
	opacity: 0.64;
	cursor: pointer;

	&:hover {
		opacity: 1;
	}
`;

const InnerPages = styled.ul<{ active: boolean }>`
	list-style: none;
	padding-left: 2rem;
	border-left: 1px solid ${palette('border')};
	height: ${({ active }) => !active ? 0 : 'auto'};
	overflow: hidden;
`;

const PageItem = styled.li<{ active: boolean, fade: boolean }>`
	font-size: 1.125rem;
	line-height: 2rem;
	color: ${(props) => props.active ? palette('primary.accent') : palette('on_alt')};
	font-variation-settings: 'wght' 500;
	opacity: ${({ fade }) => fade ? 0.64 : 1};

	&:hover {
		color: ${props => props.active ? color('purple.300') : palette('on')};
	}

	& a {
		text-decoration: none;
		color: inherit;
		width: 100%;
	}
`;

const Navigation = ({ items }: Props) => {
	const router = useRouter();
	return (
		<aside>
			<Nav>
				{
					items.map((section) => {
						const sectionActive = section.slug === router.query.slug![0];
						return (
							<Section key={section.slug}>
								<SectionTitle>{section.title}</SectionTitle>
								<InnerPages active={sectionActive}>
									{section.pages.map(({ title, slug }) => {
										const href = `/${section.slug}/${slug}`;
										const active = router.asPath === href;
										return (
											<PageItem active={active} fade={sectionActive && !active} key={slug}><Link aria-label={title} href={href}>{title}</Link></PageItem>
										)
									})}
								</InnerPages>
							</Section>
						)
					})
				}
			</Nav>
		</aside>
	);
}

export default Navigation;