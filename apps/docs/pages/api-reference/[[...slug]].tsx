import { Children, type ReactNode, useEffect, useMemo } from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import styled from "@emotion/styled";
import { useMDXComponent } from 'next-contentlayer/hooks';
import { allPages } from 'contentlayer/generated';
import { media } from "styles/utils";

import Layout from 'components/Layout';
import * as components from 'components/MDXComponents';
import { getNavigation, NavigationPage, NavigationTree, shouldPublish } from "lib/utils";
import SplitLayoutProvider from "context/SplitLayoutContext/SplitLayoutProvider";

type Props = {
    pages: NavigationPage[],
    navigation: NavigationTree,
    requestedSlug: string | null,
}


const PageWrapper = styled.div<{ index: number }>`
    width: 100%;
    padding-top: ${({ index }) => index === 0 ? 0 : 4}rem;
    padding-bottom: 4rem;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    scroll-margin-top: 5rem; 
`;

const Wrapper = ({ children }: { children: ReactNode | undefined }) => {
    return (
        <SplitLayoutProvider>
            {children}
        </SplitLayoutProvider>
    );
};

// Each inner "page" that we render as one big continuous page is wrapped with
// COMPONENTS.wrapper
const COMPONENTS = {
    ...components,
    wrapper: Wrapper
}

const APIReferencePage = ({ page }: { page: NavigationPage }) => {
    const { body } = page;
    const MDXContent = useMDXComponent(body.code);

    {/** @ts-ignore */ }
    return <MDXContent components={COMPONENTS} />
}


export default function DocumentationPage({ pages, navigation, requestedSlug }: Props) {

    useEffect(() => {
        if (requestedSlug) {
            document.getElementById(requestedSlug)?.scrollIntoView();
        }
    }, [requestedSlug]);

    return (
        <div>
            <Layout navigation={navigation} isAPI>
                <Head>
                    <title>{"API Reference"}</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="theme-color" content="#000000" />

                    {requestedSlug ? <link rel="canonical" href="https://fennel.ai/docs/api-reference" /> : null}

                    <meta name="twitter:card" content="summary" />
                    <meta name="twitter:site" content="@fennel-ai" />
                    {/* <meta name="twitter:image" content="https://fennel.ai/images/fennel-logo.png" /> */}
                    <meta name="twitter:creator" content="@fennel-ai" />
                    <meta name="twitter:domain" content="fennel.ai" />

                    <meta name="og:type" content="website" />
                    <meta name="og:site_name" content="Fennel" />
                    <meta name="og:locale" content="en_US" />
                    {/* <meta name="og:image" content="https://fennel.ai/images/fennel-logo.png" /> */}
                    {/* <meta name="og:image:secure_url" content="https://fennel.ai/images/fennel-logo.png" /> */}
                    <meta name="og:image:alt" content="Fennel Docs" />

                    <meta name="apple-mobile-web-app-title" content="Fennel" />
                    <meta name="application-name" content="Fennel" />
                </Head>
                {/* @ts-ignore */}
                {pages.map((page, index) =>
                    <PageWrapper id={page.slug} key={page.slug} index={index}>
                        <APIReferencePage page={page} />
                    </PageWrapper>
                )}

            </Layout>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    let requestedSlug = (ctx.params?.slug as string[])?.join('/');
    const navigation = getNavigation('api');
    const navigationOrder = navigation.map((nav) => nav.pages).flat();

    const ordering: { [key: string]: number } = {};
    for (let i = 0; i < navigationOrder.length; i++) {
        ordering[navigationOrder[i].slug.replace('api-reference/', '')] = i;
    }
    const navigationOrderSlugs = navigationOrder.map((nav) => nav.slug.replace('api-reference/', ''))


    const allApiReferencePages = allPages
        .filter(shouldPublish)
        .filter((p) => p.slug?.includes('api-reference'))
        .map(({ slug, ...rest }) => ({ ...rest, slug: slug?.replace('api-reference/', '') }))
        .filter((p) => navigationOrderSlugs.includes(p.slug as string))
        .sort((a, b) => ordering[a.slug || ''] - ordering[b.slug || '']);

    // Only ever falsy if the user has requested /api-reference/ directly (i.e. with no specific page slug)
    // in which case just show them the page
    if (requestedSlug !== undefined) {

        const isSection = navigation.find(({slug}) => slug.replace('api-reference/', '') === requestedSlug) 
        const isPage = allApiReferencePages.find(({ slug }) => slug === requestedSlug)

        if(isSection) {
            requestedSlug = isSection.pages[0].slug.replace('api-reference/', '');
        }
        // const allSlugs = allApiReferencePages.map(({ slug }) => slug); // <- probably unnecessary, can just do find index

        if (!isSection && !isPage) {
            return {
                notFound: true
            }
        }
    }


    return {
        props: {
            pages: allApiReferencePages,
            navigation,
            requestedSlug: requestedSlug || null,
        }
    }
}
