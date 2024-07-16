import { Global, css, ThemeProvider, useTheme } from '@emotion/react';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import type { AppProps } from 'next/app';
import localFont from '@next/font/local';
import { Toaster } from 'react-hot-toast';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { Footer } from 'ui';

import * as themes from 'styles';
import 'styles/index.css';

import Head from 'next/head';

import SectionThemeProvider, { SectionTheme } from 'context/SectionTheme';

import { Header } from 'components/Header';
import { useSystemDarkMode } from 'hooks';

export const haskoyVariable = localFont({
	src: [{
		path: "./fonts/haskoy.woff2"
	}],
	preload: true
});

const toastOptions = {
	className: '',
	style: {
		borderRadius: '0.75rem',
		padding: '1rem',
	},
};

// Check that PostHog is client-side (used to handle Next.js SSR)
if (typeof window !== 'undefined') {
	posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
		api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
		// Enable debug mode in development
		loaded: (posthog) => {
			if (process.env.NODE_ENV === 'development') posthog.debug()
		}
	})
}

const GlobalStyles = () => {
	const theme = useTheme();

	return <Global styles={css`
				@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&display=swap');

				* {
					box-sizing: border-box;
				}

				body {
					background-color: ${theme.background};
					margin: 0;
					padding: 0;
					font-family: ${haskoyVariable.style.fontFamily}, system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif;
					font-synthesis: none;
					font-feature-settings: "tnum"; /*! Enables the numeric character variants with Satoshi Variable - may want to restrict this to only li:marker elements */
					text-rendering: optimizeLegibility;
					-webkit-font-smoothing: antialiased;
					-moz-osx-font-smoothing: grayscale;
					-webkit-text-size-adjust: 100%;
				}

				button, input {
					font-family: ${haskoyVariable.style.fontFamily}, system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif;
				}
			`} />
}

export default function App({ Component, pageProps }: AppProps<BasePageProps>) {
	const router = useRouter();
	const system_dark_mode = useSystemDarkMode(false);
	const currentTheme = pageProps.theme || system_dark_mode ? 'dark' : 'light';

	useEffect(() => {
		// Track page views
		const handleRouteChange = () => posthog?.capture('$pageview')
		router.events.on('routeChangeComplete', handleRouteChange)

		return () => {
			router.events.off('routeChangeComplete', handleRouteChange)
		}
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<SectionThemeProvider>
			<PostHogProvider client={posthog}>
				<Head>
					<link rel="icon" href="/favicon.ico" sizes="any" />
					<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
					<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
					<meta name="theme-color" content="#fff" />
				</Head>
                {/* Google tag (gtag.js) */}
                <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-10944900807"></Script>
                <Script id="gtag_init">{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-10944900807');`}</Script>
                {/* Linkedin */}
				<Script id="linkedin-init">
					{`
							_linkedin_partner_id = "3952620";
							window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
							window._linkedin_data_partner_ids.push(_linkedin_partner_id);
						`}
				</Script>
				<Script id="linkedintrk">
					{`
							(function(l) {
							if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
							window.lintrk.q=[]}
							var s = document.getElementsByTagName("script")[0];
							var b = document.createElement("script");
							b.type = "text/javascript";b.async = true;
							b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
							s.parentNode.insertBefore(b, s);})(window.lintrk);
						`}
				</Script>
                <Script id="koala">
                    {
                        `!function(t){if(window.ko)return;window.ko=[],["identify","track","removeListeners","open","on","off","qualify","ready"].forEach(function(t){ko[t]=function(){var n=[].slice.call(arguments);return n.unshift(t),ko.push(n),ko}});var n=document.createElement("script");n.async=!0,n.setAttribute("src","https://cdn.getkoala.com/v1/pk_7c31a0d9bc3b7f2b546734e2a7a028b235d5/sdk.js"),(document.body || document.head).appendChild(n)}();`
                    }
                </Script>
                <Script defer async src={`//js.hs-scripts.com/22717467.js`} />
				<noscript>
					<img height="1" width="1" style={{ display: 'none' }} alt="" src={`https://px.ads.linkedin.com/collect/?pid=3952620&fmt=gif`} />
				</noscript>
                <Script id="salespanel">
                    {
                        `(function(e, f, g, h, i){$salespanel = window.$salespanel || (window.$salespanel = []);__sp = i;var a=f.createElement(g);a.type="text/javascript";a.async=1;a.src=("https:" == f.location.protocol ? "https://" : "http://") + h;var b = f.getElementsByTagName(g)[0];b.parentNode.insertBefore(a,b);})(window, document, "script", "salespanel.io/src/js/ff9fc453-2b98-4512-87e3-db4acce2b205/sp.js", "ff9fc453-2b98-4512-87e3-db4acce2b205");`
                    }
                </Script>
				<Script id="apollo">
					{
						`function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
						o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
						o.onload=function(){window.trackingFunctions.onLoad({appId:"663146dcde13170300f134d7"})},
						document.head.appendChild(o)}initApollo();`
					}
				</Script>
				<ThemeProvider theme={themes[currentTheme]}>
					<GlobalStyles />
					<SectionTheme defaultTheme={currentTheme}>
						<Header />
					</SectionTheme>
					<Component {...pageProps} />
					<ThemeProvider theme={themes.light}>
						<Footer slim={pageProps.footer === 'slim'} />
					</ThemeProvider>
					<Toaster position="bottom-left" toastOptions={toastOptions} />
				</ThemeProvider>
			</PostHogProvider>
		</SectionThemeProvider>
	)
}