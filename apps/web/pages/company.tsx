import { CallToAction } from "sections/Index";
import { useSectionTheme } from "hooks/useSectionTheme";
import { GetStaticPropsResult } from "next";
import { Angels, Hero, TeamMembers } from "sections/Company";

export default function Company() {
	useSectionTheme();
	return (
		<main>
			<Hero />
			<TeamMembers />
			<Angels />
			<CallToAction />
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