import { useMemo } from "react";
import { GetStaticPropsContext, GetStaticPaths, GetStaticProps } from "next";
import { getMDXComponent } from 'mdx-bundler/client';

import { getNavigation, getPageContent, getSection, listPaths, NavigationPage, NavigationTree, NavigationSection } from "lib/utils";
import Layout, { LayoutContext } from 'components/Layout';
import * as components from 'components/MDXComponents';

type Props = {
	page: NavigationPage,
	navigation: NavigationTree,
	section: NavigationSection,
	code: string,
	frontmatter: any,
}

export default function DocPage({ page, navigation, section, code, frontmatter }: Props) {
	const ctxValue = useMemo(() => ({
		page,
		frontmatter,
		section,
	}), [page, section, frontmatter]);

	const MDXComponent = useMemo(() => getMDXComponent(code), [code]);

	return (
		<LayoutContext.Provider value={ctxValue}>
			<Layout navigation={navigation}>
				{/** @ts-ignore */}
				<MDXComponent components={components} />
			</Layout>
		</LayoutContext.Provider>
	);
}

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {
	const navigation = getNavigation();
	
	const { params } = ctx;
	const slug = (params!.slug as string[]).join('/');

	const section = getSection(params!.slug![0]);

	const { title, code, frontmatter } = await getPageContent(slug);

	return {
		props: {
			navigation,
			section,
			page: {
				title,
			},
			code,
			frontmatter,
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