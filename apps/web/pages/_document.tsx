import { Html, Head, Main, NextScript, DocumentProps } from 'next/document'

export default function Document(props: DocumentProps) {
	const pageProps = props?.__NEXT_DATA__?.props?.pageProps;
	return (
		<Html lang="en">
			<Head />
			<body data-theme={pageProps.dark_mode ? 'dark' : 'light'}>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}