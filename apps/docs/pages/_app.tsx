import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app'
import theme from 'styles';
import 'styles/index.css';

import Header from 'components/Header';
import Footer from 'components/Footer';
import MobileToolbar from 'components/MobileToolbar';


export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={theme}>
			<Header />
			<MobileToolbar {...pageProps} />
			<Component {...pageProps} />
			<Footer />
		</ThemeProvider>
	)
}