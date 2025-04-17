import Head from 'next/head';
import { ArchitectedWithLove, CallToAction, HassleFreeScaling, HowItWorks, NoMoreBugs } from 'sections/Index';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import * as themes from 'styles';
import { Hero } from 'ui';

import UpworkLogo from 'assets/logos/upwork.svg';
import PorterLogo from 'assets/logos/porter.svg';
import EpifiLogo from 'assets/logos/epifi.svg';
import CredLogo from 'assets/logos/cred.svg';
import AplazoLogo from 'assets/logos/aplazo.svg';
import CricutLogo from 'assets/logos/cricut.svg';
import { media } from 'styles/utils';
import Incrementality from 'sections/Index/Incrementality';
import ShipFaster from 'sections/Index/ShipFaster/ShipFaster';
import CTAPill from 'components/CTAPill';


const Logos = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    text-align: center;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    margin-top: 5.5rem;

    & p {
        margin: 0;
        font-size: 0.875rem; 
        line-height: 1.25rem;

        ${media('sm')} {
            font-size: 1rem; 
        line-height: 1.5rem;
        }
    }

    & > div {
        align-self: stretch;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-auto-rows: 2.5rem;
        column-gap: 2rem;
        row-gap: 0.5rem;
        width: 100%;

        ${media('sm')} {
            grid-template-columns: repeat(6, minmax(0, 1fr));
            grid-auto-rows: 3.5rem;
        }

        & > div {
            display: flex;
            flex: 1 1 100%;
            align-items: center;
            justify-content: center;

        }
    }
`;

export default function Index() {
	return (
		<>
			<Head>
                <title>Next Generation Data Pipelines | Fennel</title>
				<meta name="description" content="Fennel helps you author, compute, store, serve, monitor & govern both realtime and batch ML features." />
				<link rel="canonical" href="https://fennel.ai/" />

                <meta property="og:title" content="Next Generation Data Pipelines | Fennel" />
                <meta property="og:description" content="Fennel helps you author, compute, store, serve, monitor & govern both realtime and batch ML features." />
				<meta property="og:url" content="https://fennel.ai/" />
				<meta property="og:image" content="https://fennel.ai/images/og/default.jpg" />
				<meta property="og:type" content="website" />
				<meta property="og:locale" content="en_US" />

				{/** Twitter will inherit the OG title and description */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@fennelAI" />
				<meta name="twitter:image" content="https://fennel.ai/images/og/default.jpg" />
			</Head>
			<main>
                <Hero title="Next Generation Data Pipelines" 
                text="Fennel helps you author, compute, store, serve, monitor & govern both realtime and batch ML pipelines."
                >
                    <Logos>
                        <p>Trusted by leading ML & Data teams</p>
                        <div>
                            <div>
                                <UpworkLogo width="100%" height={24} />
                            </div>
                            <div>
                                <PorterLogo width="100%" height={24} />
                            </div>
                            <div>
                                <CredLogo width="100%" height={24} />
                            </div>
                            <div>
                                <AplazoLogo width="100%" height={24} />
                            </div>
                            <div>
                                <EpifiLogo width="100%" height={24} />
                            </div>
                            <div>
                                <CricutLogo width="100%" height={24} />
                            </div>
                        </div>
                    </Logos>
                </Hero>
                <Incrementality />
                <ShipFaster />
				<NoMoreBugs />
				<HassleFreeScaling />
				<HowItWorks />
				<ThemeProvider theme={themes.dark}>
					<ArchitectedWithLove />
					<CallToAction />
				</ThemeProvider>
			</main>
		</>
	);
}
