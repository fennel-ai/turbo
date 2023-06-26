import { GetStaticPropsResult } from 'next';
import { ArchitectedWithLove, CallToAction, HassleFreeScaling, Hero, HowItWorks, NoMoreBugs, ShipFaster, TrulyRealtime } from 'sections/Index';
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
			<ArchitectedWithLove />
			<CallToAction />
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