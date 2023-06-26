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

export async function getStaticProps(): Promise<GetStaticPropsResult<BasePageProps>> {
	return {
		props: {
			dark_mode: false
		}
	};
}