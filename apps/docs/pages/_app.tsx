import { useEffect } from 'react';
import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import localFont from '@next/font/local';
import { Toaster } from 'react-hot-toast';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

import theme from 'styles';
import 'styles/index.css';
import "@docsearch/css";

import { ShellContextProvider } from 'context/Shell';
import Head from 'next/head';

export const satoshiVariable = localFont({
	src: [{
		path: "./fonts/Satoshi-Variable.woff2"
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

if (typeof window !== 'undefined') {
	posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || '', {
		api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
	})
}

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter()

	useEffect(() => {
		// Track page views
		const handleRouteChange = () => posthog.capture('$pageview')
		router.events.on('routeChangeComplete', handleRouteChange)

		return () => {
			router.events.off('routeChangeComplete', handleRouteChange)
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<PostHogProvider client={posthog}>
			<ShellContextProvider>
				<style jsx global>
					{`
				@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@600&display=swap');

				* {
					box-sizing: border-box;
				}

				body {
					margin: 0;
					padding: 0;
					font-family: ${satoshiVariable.style.fontFamily}, system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif;
					font-synthesis: none;
					font-feature-settings: "tnum"; /*! Enables the numeric character variants with Satoshi Variable - may want to restrict this to only li:marker elements */
					text-rendering: optimizeLegibility;
					-webkit-font-smoothing: antialiased;
					-moz-osx-font-smoothing: grayscale;
					-webkit-text-size-adjust: 100%;
				}

				button, input {
					font-family: ${satoshiVariable.style.fontFamily}, system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif;
				}
			`}
				</style>
				<Head>
					<link rel="icon" href="/docs/favicon.ico" sizes="any" />
					<link rel="icon" href="/docs/favicon.svg" type="image/svg+xml" />
					<link rel="apple-touch-icon" href="/docs/apple-touch-icon.png" />
					<meta name="theme-color" content="#5D4CBE" />
				</Head>
				<ThemeProvider theme={theme}>
					<Component {...pageProps} />
					<Toaster position="bottom-left" toastOptions={toastOptions} />
				</ThemeProvider>
			</ShellContextProvider>
		</PostHogProvider>
	)
}