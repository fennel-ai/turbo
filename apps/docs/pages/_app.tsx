import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app'
import theme from 'styles';
import localFont from '@next/font/local';
import { JetBrains_Mono } from '@next/font/google';
import "@docsearch/css";

import { ShellContextProvider } from 'context/Shell';

export const jetbrainsMono = JetBrains_Mono({
	subsets: ['latin']
});
export const addingtonCF = localFont({
	src: [{
		path: "./fonts/AddingtonCF-Medium.woff2"
	}]
});
export const satoshiVariable = localFont({
	src: [{
		path: "./fonts/Satoshi-Variable.woff2"
	}, {
		path: "./fonts/Satoshi-Variable.woff"
	}, {
		path: "./fonts/Satoshi-Variable.eot"
	}, {
		path: "./fonts/Satoshi-Variable.ttf"
	}],
	preload: true,
	variable: '--font',
});


export default function App({ Component, pageProps }: AppProps) {
	return (
		<ShellContextProvider>
			<style jsx global>
				{`
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
			</ThemeProvider>
		</ShellContextProvider>
	)
}