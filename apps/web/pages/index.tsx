import { GetStaticPropsResult } from 'next';
import { ArchitectedWithLove, CallToAction, HassleFreeScaling, Hero, HowItWorks, NoMoreBugs, ShipFaster, TrulyRealtime } from 'sections/Index';
import { ThemeProvider } from '@emotion/react';
import * as themes from 'styles';
import { useSectionTheme } from 'hooks/useSectionTheme';

export default function Index() {
	useSectionTheme();

	return (
		<main>
			<Hero />
			<ShipFaster />
			<NoMoreBugs />
			<TrulyRealtime />
			<HassleFreeScaling />
			<HowItWorks />
			<ThemeProvider theme={themes.dark}>
				<ArchitectedWithLove />
				<CallToAction />
			</ThemeProvider>
		</main>
	);
}

export async function getStaticProps(): Promise<GetStaticPropsResult<BasePageProps>> {
	return {
		props: {
			dark_mode: false
		}
	};
}