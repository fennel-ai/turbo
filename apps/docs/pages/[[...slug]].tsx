import { useEffect, useMemo } from "react";
import { GetStaticPropsContext, GetStaticPaths, GetStaticProps } from "next";
import { useMDXComponent } from 'next-contentlayer/hooks';
import { allPages, allConfigs } from 'contentlayer/generated';

import Layout, { LayoutContext } from 'components/Layout';
import * as components from 'components/MDXComponents';
import { getNavigation, getPageData, getRequestedVersionId, NavigationPage, NavigationSection, NavigationTree, shouldPublish } from "lib/utils";
import Head from "next/head";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

type Props = {
	page: NavigationPage,
	navigation: NavigationTree,
	section: NavigationSection,
	code: string,
	headings: {level: number, title: string}[]
	redirect?: string;
    version: string;
}

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(9, 1fr);
`
const MDXWrapper = styled.div`
	grid-column: span 8;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 3rem;
`

const MarginWrapper = styled.div`
	grid-column: span 1;
`

export default function DocumentationPage({ page, navigation, section, code, headings, redirect, version }: Props) {

	const router = useRouter();

	useEffect((() => {
		if (redirect) {
			router.push(redirect);
		}
	}), [redirect])

	const ctxValue = useMemo(() => ({
		page,
		section,
	}), [page, section]);

	const MDXContent = useMDXComponent(code);

	return !redirect ? (
		<LayoutContext.Provider value={ctxValue}>
			<Layout navigation={navigation} headings={headings} path={page._id} version={version}>
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
				<Wrapper>
					<MDXWrapper>
					{/* @ts-ignore */}
						<MDXContent components={components} />
					</MDXWrapper>
					<MarginWrapper/>
				</Wrapper>
			</Layout>
		</LayoutContext.Provider>
	) : null;
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
	const { params } = ctx;
    let slug = (params!.slug as string[])?.join('/');

    const version = getRequestedVersionId(params);
    const navigation = getNavigation(version, false);

    // If the user directly requests a "slug section" i.e. navigates directly to /concepts rather than /concepts/introduction,
    // then redirect them to the first page in the section.
	const isSlugSection = navigation.find(({slug: secSlug}) => secSlug === slug)
    
    let redirect = '';
	if (isSlugSection) {
		redirect = isSlugSection.pages[0].slug;
		slug = redirect;
	}

    const { code, page, section, headings } = getPageData(slug || '/');

	return {
		props: {
			navigation,
			section,
			page,
			code,
			headings,
			redirect,
            version
		}
	}
}

export const getStaticPaths: GetStaticPaths = () => {
    const pagePaths = allPages
        .filter(shouldPublish)
        .filter(({ section, version }) => {
            const config = allConfigs.find((c) => c.version === version)!;
            return !!config.sidebar!.find((s) => s.slug === section)
        }) // HOTFIX
        .map((page) => ({
            params: {
                slug: page.slug!.split('/'),
            }
        }));

	return {
		paths: pagePaths,
		fallback: false,
	}
}