import { useSectionTheme } from "hooks/useSectionTheme";
import { Angels, Hero, TeamMembers } from "sections/Company";
import { CallToAction } from "sections/Index";

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