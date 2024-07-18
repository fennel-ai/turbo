import { GetStaticPropsResult } from "next";
import Head from "next/head";

import { Hero } from 'sections/OpenDemo';

export default function OpenDemo() {
    return (
        <>
            <Head>
                <title>Monthly Live Open Demo | Register Now | Fennel</title>
                <meta name="description" content="Join us for a technical deep-dive into Fennel, hosted by CEO / Co-Founder Nikhil Garg" />
                <link rel="canonical" href="https://fennel.ai/open-demo" />

                <meta property="og:title" content="Monthly Live Open Demo | Register Now | Fennel" />
                <meta property="og:description" content="Join us for a technical deep-dive into Fennel, hosted by CEO / Co-Founder Nikhil Garg" />
                <meta property="og:url" content="https://fennel.ai/open-demo" />
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
            </main>
        </>
    );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<{ footer?: 'slim' | 'default' }>> {
    return {
        props: {
            footer: 'slim'
        }
    };
}