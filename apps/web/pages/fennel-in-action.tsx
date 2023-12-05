import Head from "next/head";
import HeroComponent from "sections/FennelInAction";

export default function GetADemo() {
	return (
		<>
			<Head>
                <title>See Fennel In Action | Fennel</title>
				<meta name="description" content="Experience the slickest realtime feature engineering workflow. Get a demo today!" />
				<link rel="canonical" href="https://fennel.ai/get-a-demo" />

                <meta property="og:title" content="See Fennel In Action | Fennel" />
				<meta property="og:description" content="Experience the slickest realtime feature engineering workflow. Get a demo today!" />
				<meta property="og:url" content="https://fennel.ai/fennel-in-action" />
				<meta property="og:image" content="https://fennel.ai/images/og/default.jpg" />
				<meta property="og:type" content="website" />
				<meta property="og:locale" content="en_US" />

				{/** Twitter will inherit the OG title and description */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@fennelAI" />
				<meta name="twitter:image" content="https://fennel.ai/images/og/default.jpg" />
			</Head>
			<main>
				<HeroComponent  />
			</main>
		</>
	);
}