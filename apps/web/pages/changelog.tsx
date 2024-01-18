import { allPages } from 'contentlayer/generated';
import { GetStaticProps, GetStaticPropsContext } from "next";
import { useMDXComponent } from 'next-contentlayer/hooks';

import Layout from 'components/Layout';
import * as components from 'components/MDXComponents';
import { NavigationPage, shouldPublish } from "lib/utils";
import { Container, TitleBlock } from "ui";
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { useScroll } from 'framer-motion';



const NavItem = styled.div`
    padding-bottom: 4rem;
    padding-top: 4rem;
    color: ${({ theme }) => theme.base};
    font-size: 1rem;
    line-height: 2.5rem;
`

import { media, rgba } from "styles/utils";

const Root = styled.div`
	position: relative;
	padding: 8rem 0 0 0;
	color: ${({ theme }) => theme.on};
	z-index: 0;
`;

const Background = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: -1;
	opacity: 0.15;
	background-size: cover;
	background-position: 50% 50%;
	background: conic-gradient(from 90deg at 1px 1px, #0000 90deg, ${({ theme }) => rgba(theme.on_alt, 0.64)} 0) 0 0/32px 32px;
	mask-image: radial-gradient(55.39% 50.37% at 50% 50%, #D9D9D9 0%, rgba(217, 217, 217, 0) 100%);
`;

const Wrapper = styled(Container)`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
`;

const Content = styled.div`
	grid-column: span 12;

	${media('md')} {
		grid-column: 3 / span 8;
	}
`;

const IntroText = styled.div`
	padding: 0;
	color: ${({ theme }) => theme.on_alt};

	${media('sm')} {
		padding: 0 2.5rem;
	}
	
	${media('md')} {
		padding: 0 6.5rem;
	}
`;

const Hero = () => {
	return (
		<Root data-section>
			<Background />
			<Wrapper>
				<Content>
					<TitleBlock 
						center
					>
						<h1>Changelog Prototype</h1>
						<IntroText>
							<p>The latest product updates, and news from the Fennel team.</p>
						</IntroText>
					</TitleBlock>
				</Content>
			</Wrapper>
		</Root>
	);
};


type Props = {
	pages: NavigationPage[],
	// navigation: NavigationTree,
	// section: NavigationSection,
	// code: string,
}

function ChangelogPage({ page }: {page : typeof allPages[0]}) {
    const {body, title} = page;
	const MDXContent = useMDXComponent(body.code);
    {/** @ts-ignore */}
    return <MDXContent components={components}/>
    
}


export default function ChangelogPages({ pages }: Props) {
	// const ctxValue = useMemo(() => ({
	// 	pages,
	// 	section,
	// }), [page, section]);
    const navDates = pages.map((_page) => _page.date);
    const [currentActive, setCurrentActive] = useState(navDates[0])
    const containerRef = useRef(null);
    const {scrollY} = useScroll({
        target: containerRef.current as any
    });
    

    useEffect(() => {
        const scrollCallback = () => {
            let currentPage = '';
            for(let i =0;i < navDates.length; i++) {
                const section = document.getElementById(navDates[i] as string);
                if(section?.offsetTop! < scrollY.get() + 80) {
                    currentPage = navDates[i] || '';
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



	return (
        <div ref={containerRef}>
        <Hero/>
			<Layout navigation={{
                items: navDates as string[],
                active: currentActive as string
            }}>
                {
                    pages.map((_page: any) => {
                        return <NavItem id={_page.date} key={_page.date}>
                            <h2>{_page.title}</h2>
                            Published on {_page.date}
                            <ChangelogPage page={_page} />
                        </NavItem>
                    })
                }
				{/* <Head>
					// 
					{page.description ? <meta name="description" content={page.description} /> : null}
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<meta name="canonical" content={`https://fennel.ai/docs/${page.slug === '/' ? '' : page.slug}/`} />
					<meta name="theme-color" content="#000000" />
					
					<meta name="twitter:card" content="summary" />
					<meta name="twitter:site" content="@fennel-ai" />
					<meta name="twitter:title" content={page.title} />
					<meta name="twitter:description" content={page.description} />
					{/* <meta name="twitter:image" content="https://fennel.ai/images/fennel-logo.png" /> */}
					{/* <meta name="twitter:creator" content="@fennel-ai" />
					<meta name="twitter:domain" content="fennel.ai" />

					<meta name="og:title" content={page.title} />
					<meta name="og:description" content={page.description} />
					<meta name="og:type" content="website" />
					<meta name="og:url" content={`https://fennel.ai/docs/${page.slug === '/' ? '' : page.slug}/`} />
					<meta name="og:site_name" content="Fennel" />
					<meta name="og:locale" content="en_US" />
					{/* <meta name="og:image" content="https://fennel.ai/images/fennel-logo.png" /> */}
					{/* /* <meta name="og:image:secure_url" content="https://fennel.ai/images/fennel-logo.png" /> */}
					{/* <meta name="og:image:alt" content="Fennel Docs" /> */}

					{/* <meta name="apple-mobile-web-app-title" content="Fennel" /> */}
					{/* <meta name="application-name" content="Fennel" /> */}
				{/* </Head> */}
				

				
			</Layout>
        </div>
	);
}

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {
	// const { params } = ctx;
    // console.log()
    const sortedPages = [...allPages].sort((a,b) => {
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);
		//@ts-ignore
        return bDate - aDate;
    }).filter(shouldPublish)

	return {
		props: {
			pages: sortedPages,
		}
	}
}

// export const getStaticPaths: GetStaticPaths = () => {
// 	return {
// 		paths: allPages
// 			.filter(shouldPublish)
// 			.map((page) => ({
// 				params: {
// 					slug: page.slug!.split('/'),
// 				}
// 			})),
// 		fallback: false,
// 	}
// }