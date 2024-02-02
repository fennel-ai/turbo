import React, { useEffect, useMemo, useRef, useState } from "react";
import { GetStaticPropsContext, GetStaticPaths, GetStaticProps } from "next";
import { useMDXComponent } from 'next-contentlayer/hooks';
import { allPages, aPIConfig } from 'contentlayer/generated';

import Layout, { LayoutContext } from 'components/Layout';
import * as components from 'components/MDXComponents';
import { getNavigation, getPageData, NavigationPage, NavigationSection, NavigationTree, shouldPublish } from "lib/utils";
import Head from "next/head";
import { useScroll } from "framer-motion";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

type Props = {
	pages: NavigationPage[],
	navigation: NavigationTree,
    navigationOrder: any,
	// section: NavigationSection,
	// code: string,
}


const PageWrapper = styled.div<{index: number}>`
    width: 100%;
    padding-top: ${({index}) => index===0 ? 0 : 4}rem;
    padding-bottom: 4rem;
    scroll-margin-top: 6.3125rem; 
`

  
const APIReferencePage = ({page}: {page: NavigationPage}) => {
    const {body} = page;
    const MDXContent = useMDXComponent(body.code);

    {/** @ts-ignore */}
    return <MDXContent components={components}/>
}


export default function DocumentationPage({ pages, navigation, navigationOrder }: Props) {
    const [currentActive, setCurrentActive] = useState(pages[0].slug)
    const containerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
          let current = ''
          for (const page of pages) {
            const slug = page.slug as string;
            const element = document.getElementById(slug)
            if (element && element.getBoundingClientRect().top < 200) {
                current = slug
            }
          }
          setCurrentActive(current)
        }
        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => {
          window.removeEventListener('scroll', handleScroll)
        }
      }, [])


	return (
        <div ref={containerRef}>
			<Layout navigation={navigation} isAPI active={currentActive} >
				<Head>
					<title>{"API Reference"}</title>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<meta name="theme-color" content="#000000" />
					
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
                    <APIReferencePage page={page}/>
                </PageWrapper>
                )}
		
			</Layout>
            </div>
	);
}

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {
	// const { params } = ctx;
    const navigation = getNavigation('api');
    const navigationOrder = navigation.map((nav) => nav.pages).flat();
    const ordering: {[key:string]: number} = {};
    for(let i=0;i<navigationOrder.length; i++) {
        ordering[navigationOrder[i].title] = i;
    }

	return {
		props: {
            pages: allPages
			.filter(shouldPublish)
			.filter((p) => p.slug?.includes('api-reference'))
            .sort((a,b) => ordering[a.title] - ordering[b.title]),
            navigation,
            navigationOrder
	    }
    }
}