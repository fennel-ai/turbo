import { useMemo } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import { getNavigation, getPage, getSection, listPaths, NavigationTree } from "lib/utils";
import Layout, { LayoutContext } from 'components/Layout';
import * as components from 'components/MDXComponents';

type Props = {
	navigation: NavigationTree,
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

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
	const navigation = getNavigation();
	
	const { params } = ctx;
	const slug = (params!.slug as string[]).join('/');

	const page = await getPage(slug);
	const section = getSection(params!.slug![0]);
	const source = await serialize(page, { 
		parseFrontmatter: true,
	});

	return {
		props: {
			section,
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