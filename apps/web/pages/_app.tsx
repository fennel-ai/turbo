import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app'
import localFont from '@next/font/local';
import { Toaster } from 'react-hot-toast';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

import theme from 'styles';
import 'styles/index.css';

import Head from 'next/head';

import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { useEffect } from 'react';

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

export default function App({ Component, pageProps }: AppProps) {
	useEffect(() => {
		document.body.setAttribute('data-theme', pageProps.dark_mode ? 'dark' : 'light')
	}, [pageProps.dark_mode]);

	return (
		<PostHogProvider client={posthog}>
			<style jsx global>
				{`
					@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@600&display=swap');

					* {
						box-sizing: border-box;
					}

					body {
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
				`}
			</style>
			<Head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
				<meta name="theme-color" content="#fff" />
			</Head>
			<ThemeProvider theme={theme}>
				<Header />
				<Component {...pageProps} />
				<Footer />
				<Toaster position="bottom-left" toastOptions={toastOptions} />
			</ThemeProvider>
		</PostHogProvider>
	)
}