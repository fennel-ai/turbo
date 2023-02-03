import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { getNavigation, getPage, listPaths, ManifestPage, Navigation } from "../lib/getNavigation";

type Props = {
	navigation: Navigation,
	page: ManifestPage,
}

export default function DocPage({ navigation, page }: Props) {
	return (
		<div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem' }}>
			<aside style={{gridColumn: 'span 3'}}>
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
			<main style={{gridColumn: 'span 8'}}>
				<h1>{page.title}</h1>
			</main>
		</div>
	);
}

export const getStaticProps: GetStaticProps<Props> = (ctx) => {
	const navigation = getNavigation();
	
	const { params } = ctx;
	const slug = (params!.slug as string[]).join('/');

	const page = getPage(slug);

	return {
		props: {
			navigation,
			page,
		}
	}
}

export const getStaticPaths: GetStaticPaths = () => {
	const paths = listPaths();
	return {
		paths: paths,
		fallback: false,
	}
}