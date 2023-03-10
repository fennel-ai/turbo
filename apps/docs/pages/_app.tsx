import { useEffect } from 'react';
import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app'
import Script from 'next/script';
import theme from 'styles';
import localFont from '@next/font/local';
import { Toaster } from 'react-hot-toast';
import { PostHogProvider } from 'posthog-js/react';
import 'styles/index.css';
import "@docsearch/css";

import { ShellContextProvider } from 'context/Shell';
import { useRouter } from 'next/router';

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

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	return (
		<PostHogProvider>
			<ShellContextProvider>
				<Script src={`${router.basePath}/posthog.js`} />
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
				<ThemeProvider theme={theme}>
					<Component {...pageProps} />
					<Toaster position="bottom-left" toastOptions={toastOptions} />
				</ThemeProvider>
			</ShellContextProvider>
		</PostHogProvider>
	)
}