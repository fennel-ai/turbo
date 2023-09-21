import { useEffect } from 'react';
import { Global, css, ThemeProvider, useTheme } from '@emotion/react';
import type { AppProps } from 'next/app'
import Script from 'next/script';
import { useRouter } from 'next/router';
import localFont from '@next/font/local';
import { Toaster } from 'react-hot-toast';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

import * as themes from 'styles';
import 'styles/index.css';
import "@docsearch/css";

import { ShellContextProvider } from 'context/Shell';
import Head from 'next/head';
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
		@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@600&display=swap');

		* {
			box-sizing: border-box;
		}

		body {
			background-color: ${theme.background};
			color: ${theme.on_alt};
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

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter()

	const system_dark_mode = useSystemDarkMode();
	const currentTheme = system_dark_mode ? 'dark' : 'light';

	useEffect(() => {
		// Track page views
		const handleRouteChange = () => posthog?.capture('$pageview')
		router.events.on('routeChangeComplete', handleRouteChange)

		return () => {
			router.events.off('routeChangeComplete', handleRouteChange)
		}
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<PostHogProvider client={posthog}>
			<ShellContextProvider>
				<Head>
					<link rel="icon" href="/favicon.ico" sizes="any" />
					<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
					<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
					<meta name="theme-color" content="#fff" />
				</Head>
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
				<noscript>
					<img height="1" width="1" style={{ display: 'none' }} alt="" src={`https://px.ads.linkedin.com/collect/?pid=3952620&fmt=gif`} />
				</noscript>
                <Script id="leadmagic">
                    {`
                        <!-- LeadMagic analytics code -->
                        !function(i,s,o,g,r,a,m){i.Ip2cObject=o;i[o]||(i[o]=function(){
                        (i[o].q=i[o].q||[]).push(arguments)});i[o].l=+new Date;r=s.createElement(g);
                        a=s.getElementsByTagName(g)[0];r.src='//reveal.ip2c.net/8423496.js';
                        a.parentNode.insertBefore(r,a)}(window,document,'ip2c','script');
                                
                        ip2c('verify', '8423496');
                    `}
                </Script>
				<ThemeProvider theme={themes[currentTheme]}>
					<GlobalStyles />
					<Component {...pageProps} />
					<Toaster position="bottom-left" toastOptions={toastOptions} />
				</ThemeProvider>
			</ShellContextProvider>
		</PostHogProvider>
	)
}