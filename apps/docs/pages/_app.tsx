import { ThemeProvider } from '@emotion/react';
import Header from 'components/Header';
import type { AppProps } from 'next/app'
import 'styles/index.css';

import theme from 'styles';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={theme}>
			<Header />
			<Component {...pageProps} />
		</ThemeProvider>
	)
}