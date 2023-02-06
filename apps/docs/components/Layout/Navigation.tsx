import type { NavigationTree } from "lib/utils";
import Link from "next/link";

type Props = {
	items: NavigationTree
}

const Navigation = ({ items }: Props) => (
	<aside>
		{
			items.map((section) => (
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
);

export default Navigation;