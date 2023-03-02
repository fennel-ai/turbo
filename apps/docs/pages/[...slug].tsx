import { useMemo } from "react";
import { GetStaticPropsContext, GetStaticPaths, GetStaticProps } from "next";
import { useMDXComponent } from 'next-contentlayer/hooks';
import { allDocPages, allSections, DocPage, Section } from 'contentlayer/generated';

import Layout, { LayoutContext } from 'components/Layout';
import * as components from 'components/MDXComponents';
import { getNavigation, NavigationTree } from "lib/utils";

type Props = {
	page: Partial<DocPage>,
	navigation: NavigationTree,
	section: Section,
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
	const { 
		body, 
		description = "", 
		section, 
		title, 
		order 
	} = allDocPages.find((page) => page.slug === slug)!;

	return {
		props: {
			navigation: getNavigation(),
			section: allSections.find((s) => s.slug === section)!,
			page: {
				description,
				title,
				order,
			},
			code: body.code,
		}
	}
}

export const getStaticPaths: GetStaticPaths = () => {
	return {
		paths: allDocPages.map((page) => ({
			params: {
				slug: page.slug!.split('/'),
			}
		})),
		fallback: false,
	}
}