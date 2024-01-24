import { useMemo } from "react";
import { GetStaticPropsContext, GetStaticPaths, GetStaticProps } from "next";
import { useMDXComponent } from 'next-contentlayer/hooks';
import { allPages } from 'contentlayer/generated';

import Layout, { LayoutContext } from 'components/Layout';
import * as components from 'components/MDXComponents';
import { getNavigation, getPageData, NavigationPage, NavigationSection, NavigationTree, shouldPublish } from "lib/utils";
import Head from "next/head";

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
	console.log("GTTGTG:", allPages)

	return (
		<LayoutContext.Provider value={ctxValue}>
			<Layout navigation={navigation}>
				<Head>
					<title>{page.title}</title>
					{page.description ? <meta name="description" content={page.description} /> : null}
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<meta name="canonical" content={`https://fennel.ai/docs/${page.slug === '/' ? '' : page.slug}/`} />
					<meta name="theme-color" content="#000000" />
					
					<meta name="twitter:card" content="summary" />
					<meta name="twitter:site" content="@fennel-ai" />
					<meta name="twitter:title" content={page.title} />
					<meta name="twitter:description" content={page.description} />
					{/* <meta name="twitter:image" content="https://fennel.ai/images/fennel-logo.png" /> */}
					<meta name="twitter:creator" content="@fennel-ai" />
					<meta name="twitter:domain" content="fennel.ai" />

					<meta name="og:title" content={page.title} />
					<meta name="og:description" content={page.description} />
					<meta name="og:type" content="website" />
					<meta name="og:url" content={`https://fennel.ai/docs/${page.slug === '/' ? '' : page.slug}/`} />
					<meta name="og:site_name" content="Fennel" />
					<meta name="og:locale" content="en_US" />
					{/* <meta name="og:image" content="https://fennel.ai/images/fennel-logo.png" /> */}
					{/* <meta name="og:image:secure_url" content="https://fennel.ai/images/fennel-logo.png" /> */}
					<meta name="og:image:alt" content="Fennel Docs" />

					<meta name="apple-mobile-web-app-title" content="Fennel" />
					<meta name="application-name" content="Fennel" />
				</Head>
				{/** @ts-ignore */}
				<MDXContent components={components} />
			</Layout>
		</LayoutContext.Provider>
	);
}

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {
	const { params } = ctx;
	const slug = (params!.slug as string[])?.join('/');
	const { code, page, section } = getPageData(slug || '/');

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
			.filter(page => !page.slug?.includes('api-reference'))
			.map((page) => ({
				params: {
					slug: page.slug!.split('/'),
				}
			})),
		fallback: false,
	}
}