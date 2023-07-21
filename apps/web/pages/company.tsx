import { CallToAction } from "sections/Index";
import Head from "next/head";
import { Angels, Hero, TeamMembers } from "sections/Company";
import { ThemeProvider } from '@emotion/react';
import * as themes from 'styles';

export default function Company() {
	return (
		<>
			<Head>
				<title>Company · Fennel</title>
				<meta name="description" content="Fennel is an ex-Facebook/Google team on a mission to enable companies and teams of any size to harness realtime machine learning to build delightful products for their customers." />
				<link rel="canonical" href="https://fennel.ai/company" />

				<meta property="og:title" content="Fennel · Company" />
				<meta property="og:description" content="Fennel is an ex-Facebook/Google team on a mission to enable companies and teams of any size to harness realtime machine learning to build delightful products for their customers." />
				<meta property="og:url" content="https://fennel.ai/company" />
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
				<TeamMembers />
				<Angels />
				<ThemeProvider theme={themes.dark}>
					<CallToAction />
				</ThemeProvider>
			</main>
		</>
	);
}
