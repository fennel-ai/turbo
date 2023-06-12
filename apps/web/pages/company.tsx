import { useSectionTheme } from "hooks/useSectionTheme";
import { Angels, Hero, Investors, TeamMembers } from "sections/Company";
import { CallToAction } from "sections/Index";

export default function Company() {
	useSectionTheme();
	return (
		<main>
			<Hero />
			<TeamMembers />
			<Investors />
			<Angels />
			<CallToAction />
		</main>
	);
}