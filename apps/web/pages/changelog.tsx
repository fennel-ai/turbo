import { allPages } from 'contentlayer/generated';
import { GetStaticProps, GetStaticPropsContext } from "next";
import { useMDXComponent } from 'next-contentlayer/hooks';

import Layout from 'components/Layout';
import * as components from 'mdx-components';
import { NavigationPage, shouldPublish } from "lib/utils";
import { Container, TitleBlock } from "ui";
import styled from '@emotion/styled';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';


const NavItem = styled.div`
    padding-bottom: 4rem;
    padding-top: 4rem;
    color: ${({ theme }) => theme.base};
    font-size: 1rem;
    line-height: 2.5rem;
	scroll-margin-top:2rem;
`

import { media, rgba } from "styles/utils";
import Head from 'next/head';

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
						<h1>Changelog</h1>
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
}

function ChangelogPage({ page }: {page : typeof allPages[0]}) {
    const {body, title} = page;
	const MDXContent = useMDXComponent(body.code);
    {/** @ts-ignore */}
    return <MDXContent components={components}/>
    
}


const RenderChangelogPage = ({page, onChange}: {
	page: typeof allPages[0], 
	onChange: (date: string) => void;
}) => {
	const ref = useRef(null)
	const isInView = useInView(ref, {amount: 0.5});

	useEffect(() => {
		if(isInView){
			onChange(page.date)
		}
	  }, [isInView])

	return <NavItem id={page.date} key={page.date} ref={ref}>
			<h2>{page.title}</h2>
			<p>Published on {page.date}</p>
			<ChangelogPage page={page} />
		</NavItem>
}



export default function ChangelogPages({ pages }: Props) {
    const navDates = pages.map((_page) => _page.date);
    const [currentActive, setCurrentActive] = useState(navDates[0])
    const containerRef = useRef(null);

	const onChange = useCallback((date: string) => {
		setCurrentActive(date)
	}, [setCurrentActive])

	return (
        <div ref={containerRef}>
        <Hero/>
			<Layout navigation={{
                items: navDates as string[],
                active: currentActive as string
            }}>
				<Head>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<meta name="theme-color" content="#000000" />
					
					<meta name="twitter:card" content="summary" />
					<meta name="twitter:site" content="@fennel-ai" />
					<meta name="twitter:title" content={"Fennel | Changelog"} />
					<meta name="twitter:description" content={"page.description"} />
					<meta name="twitter:image" content="https://fennel.ai/images/fennel-logo.png" />
					<meta name="twitter:creator" content="@fennel-ai" />
					<meta name="twitter:domain" content="fennel.ai" />

					<meta name="og:title" content={"Fennel | Changelog"} />
					<meta name="og:description" content={"The latest product updates, and news from the Fennel team."} />
					<meta name="og:type" content="website" />
					<meta name="og:url" content={`https://fennel.ai/changelog`} />
					<meta name="og:site_name" content="Fennel" />
					<meta name="og:locale" content="en_US" />
					<meta name="og:image" content="https://fennel.ai/images/fennel-logo.png" />
					<meta name="og:image:secure_url" content="https://fennel.ai/images/fennel-logo.png" />
					<meta name="og:image:alt" content="Fennel Docs" />

					<meta name="apple-mobile-web-app-title" content="Fennel" />
					<meta name="application-name" content="Fennel" />
				</Head>
				{
                    pages.map((p)=><RenderChangelogPage page={p as typeof allPages[0]} onChange={onChange}/>)
                }
			</Layout>
        </div>
	);
}

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {
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