import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app'
import theme from 'styles';
import 'styles/index.css';

import Header from 'components/Header';
import Footer from 'components/Footer';
import MobileToolbar from 'components/MobileToolbar';
import MobileMenu from 'components/MobileMenu';
import { ShellContextProvider } from 'context/Shell';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ShellContextProvider>
			<ThemeProvider theme={theme}>
				<Header />
				<MobileToolbar {...pageProps} />
				<Component {...pageProps} />
				<Footer />
				{/* <AnimatePresence>
					{showMobileMenu ? <MobileMenu {...pageProps} onClose={handleToggleMenu} /> : null}
				</AnimatePresence> */}
			</ThemeProvider>
		</ShellContextProvider>
	)
}