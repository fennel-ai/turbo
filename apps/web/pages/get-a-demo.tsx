import { GetStaticPropsResult } from "next";
import Head from "next/head";
import { Hero, DemoForm } from 'sections/GetADemo';

export default function GetADemo() {
	return (
		<>
			<Head>
                <title>Get a Demo To Build Realtime ML Pipelines | Fennel</title>
				<meta name="description" content="Ready to step into the future? Get a demo today!" />
				<link rel="canonical" href="https://fennel.ai/get-a-demo" />

                <meta property="og:title" content="Get a Demo To Build Realtime ML Pipelines | Fennel" />
				<meta property="og:description" content="Ready to step into the future? Get a demo today!" />
				<meta property="og:url" content="https://fennel.ai/get-a-demo" />
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
				<DemoForm />
			</main>
		</>
	);
}

export async function getStaticProps(): Promise<GetStaticPropsResult<BasePageProps>> {
	return {
		props: {
			theme: 'dark'
		}
	};
}