import { useMemo } from "react";
import { GetStaticPropsContext, GetStaticPaths, GetStaticProps } from "next";
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import remarkGfm from "remark-gfm";

import { getNavigation, getPageContent, getPageDefinition, getSection, listPaths, ManifestPage, NavigationTree, NavigationSection } from "lib/utils";
import Layout, { LayoutContext } from 'components/Layout';
import * as components from 'components/MDXComponents';

type Props = {
	metadata: ManifestPage,
	navigation: NavigationTree,
	section: NavigationSection,
	source: MDXRemoteSerializeResult,
}

export default function DocPage({ navigation, section, source }: Props) {
	const ctxValue = useMemo(() => ({
		frontmatter: source.frontmatter,
		section,
	}), [section, source.frontmatter]);

	return (
		<Layout navigation={navigation}>
			<LayoutContext.Provider value={ctxValue}>
				<MDXRemote {...source} components={components} />
			</LayoutContext.Provider>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {
	const navigation = getNavigation();
	
	const { params } = ctx;
	const slug = (params!.slug as string[]).join('/');

	const metadata = getPageDefinition(slug);
	const section = getSection(params!.slug![0]);
	
	const page = await getPageContent(slug);
	const source = await serialize(page, { 
		parseFrontmatter: true,
		mdxOptions: {
			remarkPlugins: [remarkGfm]
		}
	});

	return {
		props: {
			navigation,
			section,
			metadata,
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