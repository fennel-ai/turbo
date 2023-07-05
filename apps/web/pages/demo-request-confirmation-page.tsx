import { GetStaticPropsResult } from "next";
import { Calendly, Hero } from "sections/DemoRequestConfirmation";

export default function DemoRequestConfirmation() {
	return (
		<main>
			<Hero />
			<Calendly />
		</main>
	)
}
