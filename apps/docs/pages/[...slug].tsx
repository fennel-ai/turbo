import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import { getNavigation, getPage, listPaths, Navigation } from "../lib/utils";

type Props = {
	navigation: Navigation,
	source: MDXRemoteSerializeResult,
}

export default function DocPage({ navigation, source }: Props) {
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
				<MDXRemote {...source} />
			</main>
		</div>
	);
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
	const navigation = getNavigation();
	
	const { params } = ctx;
	const slug = (params!.slug as string[]).join('/');

	const page = await getPage(slug);
	const source = await serialize(page, { parseFrontmatter: true });

	return {
		props: {
			navigation,
			source,
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