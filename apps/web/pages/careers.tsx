import { ThemeProvider } from '@emotion/react';
import Head from "next/head";
import * as themes from 'styles';

import { CallToAction } from "sections/Index";
import { Hero } from "sections/Careers";
import JobList from 'sections/Careers/JobList';

export default function Company() {
	return (
		<>
			<Head>
                <title>Careers | Fennel</title>
				<meta name="description" content="Fennel is on a mission to enable companies and teams of any size to harness realtime machine learning to build delightful products for their customers." />
				<link rel="canonical" href="https://fennel.ai/careers" />

                <meta property="og:title" content="Careers | Fennel" />
				<meta property="og:description" content="Fennel is on a mission to enable companies and teams of any size to harness realtime machine learning to build delightful products for their customers." />
				<meta property="og:url" content="https://fennel.ai/careers" />
				<meta property="og:image" content="https://fennel.ai/images/og/default.jpg" />
				<meta property="og:type" content="website" />
				<meta property="og:locale" content="en_US" />

				{/** Twitter will inherit the OG title and description */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@fennelAI" />
				<meta name="twitter:image" content="https://fennel.ai/images/og/default.jpg" />
			</Head>
			<main>
				<Hero />
                <JobList />
				<ThemeProvider theme={themes.dark}>
					<CallToAction />
				</ThemeProvider>
			</main>
		</>
	);
}
