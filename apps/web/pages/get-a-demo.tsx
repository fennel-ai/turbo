import { GetStaticPropsResult } from "next";
import { ThemeProvider } from '@emotion/react';
import * as themes from 'styles';
import { Hero, DemoForm } from 'sections/GetADemo';

export default function GetADemo() {
	return (
		<ThemeProvider theme={themes.dark}>
			<main>
				<Hero />
				<DemoForm />
			</main>
		</ThemeProvider>
	);
}

export async function getStaticProps(): Promise<GetStaticPropsResult<BasePageProps>> {
	return {
		props: {
			theme: 'dark'
		}
	};
}