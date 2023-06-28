import { CallToAction } from "sections/Index";
import { GetStaticPropsResult } from "next";
import { Angels, Hero, TeamMembers } from "sections/Company";
import { ThemeProvider } from '@emotion/react';
import * as themes from 'styles';

export default function Company() {
	return (
		<main>
			<Hero />
			<TeamMembers />
			<Angels />
			<ThemeProvider theme={themes.dark}>
				<CallToAction />
			</ThemeProvider>
		</main>
	);
}

export async function getStaticProps(): Promise<GetStaticPropsResult<BasePageProps>> {
	return {
		props: {
			theme: 'light'
		}
	};
}