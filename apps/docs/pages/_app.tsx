import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app'
import theme from 'styles';
import 'styles/index.css';

import { ShellContextProvider } from 'context/Shell';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ShellContextProvider>
			<ThemeProvider theme={theme}>
				<Component {...pageProps} />
			</ThemeProvider>
		</ShellContextProvider>
	)
}