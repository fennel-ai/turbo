import Head from 'next/head';
import { ArchitectedWithLove, CallToAction, HassleFreeScaling, HeroV2, HowItWorks, NoMoreBugs, SeeItInAction, ShipFasterV2, TrulyRealtime } from 'sections/Index';
import { ThemeProvider } from '@emotion/react';
import * as themes from 'styles';

export default function Index() {
	return (
		<>
			<Head>
                <title>Realtime Feature Store for Machine Learning | Fennel</title>
				<meta name="description" content="Fennel helps you author, compute, store, serve, monitor & govern both realtime and batch ML features." />
				<link rel="canonical" href="https://fennel.ai/" />

                <meta property="og:title" content="Realtime Feature Store for Machine Learning | Fennel" />
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
				<HeroV2 />
				<SeeItInAction/>
				<ShipFasterV2 />
				<NoMoreBugs />
				<TrulyRealtime />
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
