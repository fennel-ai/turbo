import { useCallback, useRef } from 'react';
import Head from "next/head";

import { Hero, TalkingPoints } from 'sections/OpenDemo';
import type { HeroRefHandle } from 'sections/OpenDemo/Hero/Hero';

export default function OpenDemo() {
    const heroRef = useRef<HeroRefHandle>(null);
    const focusForm = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setTimeout(() => {
            if (heroRef.current) {
                heroRef.current?.shakeForm();
            }
        }, 750);
    }, []);
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
                <Hero ref={heroRef} />
                <TalkingPoints onCTAClick={focusForm} />
            </main>
        </>
    );
}