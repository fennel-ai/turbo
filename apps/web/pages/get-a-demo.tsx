import { GetStaticPropsResult } from "next";
import { Hero, DemoForm } from 'sections/GetADemo';

export default function GetADemo() {
	return (
		<main>
			<Hero />
			<DemoForm />
		</main>
	);
}

export async function getStaticProps(): Promise<GetStaticPropsResult<BasePageProps>> {
	return {
		props: {
			dark_mode: true
		}
	};
}