import { useMemo } from "react";
import { GetStaticPropsContext, GetStaticPaths, GetStaticProps } from "next";
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import remarkGfm from "remark-gfm";

import { getNavigation, getPageContent, getPageDefinition, getSection, listPaths, NavigationPage, NavigationTree, NavigationSection } from "lib/utils";
import Layout, { LayoutContext } from 'components/Layout';
import * as components from 'components/MDXComponents';

type Props = {
	metadata: NavigationPage,
	navigation: NavigationTree,
	section: NavigationSection,
	source: MDXRemoteSerializeResult,
}

export default function DocPage({ metadata, navigation, section, source }: Props) {
	const ctxValue = useMemo(() => ({
		metadata,
		frontmatter: source.frontmatter,
		section,
	}), [metadata, section, source.frontmatter]);

	return (
		<LayoutContext.Provider value={ctxValue}>
			<Layout navigation={navigation}>
				{/** @ts-ignore */}
				<MDXRemote {...source} components={components} />
			</Layout>
		</LayoutContext.Provider>
	);
}

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {
	const navigation = getNavigation();
	
	const { params } = ctx;
	const slug = (params!.slug as string[]).join('/');

	const section = getSection(params!.slug![0]);

	const page = await getPageContent(slug);

	const source = await serialize(page.content!, { 
		parseFrontmatter: true,
		mdxOptions: {
			remarkPlugins: [remarkGfm]
		}
	});

	return {
		props: {
			navigation,
			section,
			metadata: {
				title: page.title,
			},
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