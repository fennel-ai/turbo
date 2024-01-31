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

type Props = {
	pages: NavigationPage[],
	navigation: NavigationTree,
	// section: NavigationSection,
	// code: string,
}


const PageWrapper = styled.div`
    position: relative;
`


  const TwoColumnLayout = ({ children }: any) => {
    const preElements: any = [];
    const otherElements: any = [];
  
    React.Children.forEach(children, child => {
        console.log(child)
      if (React.isValidElement(child) && child.type === 'pre') {
        preElements.push(child);
      } else {
        otherElements.push(child);
      }
    });
  
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          {otherElements}
        </div>
        <div style={{ flex: 1 }}>
          {preElements}
        </div>
      </div>
    );
  }
  
const APIReferencePage = ({page}: {page: NavigationPage}) => {
    const {body} = page;
    const MDXContent = useMDXComponent(body.code);

    {/** @ts-ignore */}
    return <TwoColumnLayout><MDXContent components={components}/></TwoColumnLayout>
}


export default function DocumentationPage({ pages, navigation }: Props) {

    const [currentActive, setCurrentActive] = useState(pages[0].slug)
    const containerRef = useRef(null);
    const {scrollY} = useScroll({
        target: containerRef.current as any
    });


    useEffect(() => {
        const scrollCallback = () => {
            let currentPage = '';
            for(let i =0;i < pages.length; i++) {
                const section = document.getElementById(pages[i].slug as string);
                if(section?.offsetTop! < scrollY.get() + 80) {
                    currentPage = pages[i].slug || '';
                }
            }
            setCurrentActive(currentPage);
        }

        document.addEventListener('scroll', scrollCallback);
        document.addEventListener('hashchange', () => console.log('fire'));
        return () => {
            document.removeEventListener('scroll', scrollCallback);
            // document.removeEventListener('hashchange', scrollCallback);
        }
    }, [])

    console.log('navigation:', navigation, pages)

	return (
        <div ref={containerRef}>
			<Layout navigation={navigation} isAPI >
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
                {pages.map((page) => 
                <PageWrapper id={page.slug} key={page.slug}>
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
	    }
    }
}