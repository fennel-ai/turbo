import { GetStaticPropsResult } from 'next';
import { ArchitectedWithLove, CallToAction, HassleFreeScaling, Hero, HowItWorks, NoMoreBugs, ShipFaster, TrulyRealtime } from 'sections/Index';
import { ThemeProvider } from '@emotion/react';
import * as themes from 'styles';

export default function Index() {
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
