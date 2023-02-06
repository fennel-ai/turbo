import { ReactNode } from "react";
import styled from '@emotion/styled';
import Link from 'next/link';

import { Navigation } from "lib/utils";

type Props = {
	children: ReactNode,
	navigation: Navigation
}

const Root = styled.div`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	gap: 2rem;

	& > aside {
		grid-column: span 3;
	}

	& > main {
		grid-column: span 8;
	}
`;

export const Layout = ({ children, navigation }: Props) => {
	return (
		<Root>
			<aside style={{ gridColumn: 'span 3' }}>
				{
					navigation.map((section) => (
						<ul key={section.slug}>
							<li>{section.title}</li>
							<ul>
								{section.pages.map(({ title, slug }) => (
									<li key={slug}><Link aria-label={title} href={`/${section.slug}/${slug}`}>{title}</Link></li>
								))}
							</ul>
						</ul>
					))
				}
			</aside>
			<main>
				{children}
			</main>
		</Root>
	)
};