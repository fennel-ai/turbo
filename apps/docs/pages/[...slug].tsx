import { useMemo } from "react";
import { GetStaticPropsContext, GetStaticPaths, GetStaticProps } from "next";
import { useMDXComponent } from 'next-contentlayer/hooks';
import { allPages } from 'contentlayer/generated';

import Layout, { LayoutContext } from 'components/Layout';
import * as components from 'components/MDXComponents';
import { getNavigation, getPageData, NavigationPage, NavigationSection, NavigationTree, shouldPublish } from "lib/utils";

type Props = {
	page: NavigationPage,
	navigation: NavigationTree,
	section: NavigationSection,
	code: string,
}

export default function DocumentationPage({ page, navigation, section, code }: Props) {
	const ctxValue = useMemo(() => ({
		page,
		section,
	}), [page, section]);

	const MDXContent = useMDXComponent(code);

	return (
		<LayoutContext.Provider value={ctxValue}>
			<Layout navigation={navigation}>
				{/** @ts-ignore */}
				<MDXContent components={components} />
			</Layout>
		</LayoutContext.Provider>
	);
}

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {
	const { params } = ctx;
	const slug = (params!.slug as string[]).join('/');

	const { code, page, section } = getPageData(slug);

	return {
		props: {
			navigation: getNavigation(),
			section,
			page,
			code,
		}
	}
}

export const getStaticPaths: GetStaticPaths = () => {
	return {
		paths: allPages
			.filter(shouldPublish)
			.map((page) => ({
				params: {
					slug: page.slug!.split('/'),
				}
			})),
		fallback: false,
	}
}