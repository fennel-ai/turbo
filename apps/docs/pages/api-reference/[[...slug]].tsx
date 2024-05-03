import { ReactNode, PropsWithChildren, useCallback, useEffect } from "react";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { useMDXComponent } from 'next-contentlayer/hooks';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';
import { allAPIPages, APIPage } from 'contentlayer/generated';
import Head from "next/head";
import styled from "@emotion/styled";

import { getNavigation, getRequestedVersionId, NavigationTree, shouldPublish } from "lib/utils";

import Layout from 'components/Layout';
import * as components from 'components/MDXComponents';
import SplitLayoutProvider from "context/SplitLayoutContext/SplitLayoutProvider";

type Props = {
    pages: APIPage[],
    navigation: NavigationTree,
    requestedSlug: string | null,
    version: string,
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

const APIReferencePage = ({ page }: { page: APIPage }) => {
    const { body } = page;
    const MDXContent = useMDXComponent(body.code);

    {/** @ts-ignore */ }
    return <MDXContent components={COMPONENTS} />
}

const APIReferenceSection = ({ children, index, slug, onWaypoint }: PropsWithChildren<{ index: number, slug: string, onWaypoint: (newSlug: string) => void }>) => {
    const onChange = useCallback((inView: boolean) => {
        if (inView) {
            onWaypoint(slug);
            window.dispatchEvent(new PopStateEvent('popstate'));
        }
    }, [slug]); // eslint-disable-line
    
    const { ref } = useInView({
        threshold: 0.1,
        trackVisibility: true,
        delay: 100,
        onChange
    });

    return (
        <PageWrapper id={slug} ref={ref} index={index}>
            {children}
        </PageWrapper>
    );
};

export default function ApiReferencePage({ pages, navigation, requestedSlug, version }: Props) {
    const router = useRouter();

    useEffect(() => {
        if (requestedSlug) {
            document.getElementById(requestedSlug)?.scrollIntoView();
        }
    }, [requestedSlug]);

    const updateAddressBar = useCallback((slug: string) => {
        const newUrl = ['/docs/api-reference', slug].filter((s) => s !== undefined).join('/');
        window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
    }, []);
    
    // Handle overriding the routers pop state behavior
    useEffect(() => {
        router.beforePopState(({ as }) => {
            if (as.replace("/docs", "") !== router.asPath) {
                const slug = as.replace("/docs/api-reference/", "");
                const element = document.getElementById(slug);
                if (element) {
                    updateAddressBar(slug);
                    
                    setTimeout(() => {
                        element.scrollIntoView();
                    }, 100);

                    return false;
                }
            }
            return true;
        });

        return () => {
            router.beforePopState(() => true);
        };
    }, []); // eslint-disable-line

    const renderPage = useCallback((page: APIPage, index: number) =>
        <APIReferenceSection key={page.slug} index={index} slug={page.slug!} onWaypoint={updateAddressBar}>
            <APIReferencePage page={page} />
        </APIReferenceSection>
    , [updateAddressBar])

    return (
            <Layout navigation={navigation} isAPI version={version}>
                <Head>
                    <title>{"API Reference"}</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="theme-color" content="#000000" />

                    {requestedSlug ? <link rel="canonical" href={`https://fennel.ai/docs/api-reference${version !== 'main' ? `/${version}` : ''}`} /> : null}

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
                {pages.map(renderPage)}

            </Layout>
    );
}

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {
    let requestedSlug = (ctx.params?.slug as string[])?.join('/');

    const version = getRequestedVersionId(ctx.params);
    const navigation = getNavigation(version, true);
    const navigationOrder = navigation.map((nav) => nav.pages).flat();

    const ordering: { [key: string]: number } = {};
    for (let i = 0; i < navigationOrder.length; i++) {
        let cSlug = navigationOrder[i].slug;
        ordering[cSlug] = i;
    }

    const navigationOrderSlugs = navigationOrder.map((nav) => nav.slug)

    const allApiReferencePages = allAPIPages
        .filter(shouldPublish)
        .filter((p) => navigationOrderSlugs.includes(p.slug!))
        .sort((a, b) => ordering[a.slug || ''] - ordering[b.slug || '']);

    // Only ever falsy if the user has requested /api-reference/[version?] directly (i.e. with no specific page slug)
    // in which case just show them the page.
    let isBasePath = !requestedSlug || requestedSlug === version;
    
    if (!isBasePath) {
        const isSection = navigation.find(({slug}) => slug === requestedSlug) 
        const isPage = allApiReferencePages.find(({ slug }) => slug === requestedSlug)

        if(isSection) {
            requestedSlug = isSection.pages[0].slug;
        }

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
            requestedSlug: isBasePath ? null : requestedSlug || null,
            version,
        }
    }
}

export const getStaticPaths = () => {
    return {
        paths: [
            {
                params: { slug: [] }
            },
        ],
        fallback: 'blocking'
    }
}