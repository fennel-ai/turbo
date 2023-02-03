import { GetStaticPaths } from "next";
import { getNavigation, Navigation } from "../lib/getNavigation";

type Props = {
	navigation: Navigation,
}

export default function DocPage({ navigation }: Props) {
	return (
		<div>
			<h1>DocPage</h1>
			{
				navigation.map(({ title, slug, pages }) => (
					<ul key={slug}>
						<li>{title}</li>
						<ul>
							{pages.map(({ title, slug }) => (
								<li key={slug}>{title}</li>
							))}
						</ul>
					</ul>
				))
			}
		</div>
	);
}

type StaticProps = {
	props: Props,
}

export function getStaticProps(): StaticProps {
	const navigation = getNavigation();

	return {
		props: {
			navigation,
		}
	}
}

export const getStaticPaths: GetStaticPaths = () => {
	return {
		paths: [
			{
				params: {
					slug: ['getting-started', 'welcome-to-fennel']
				}
			}
		],
		fallback: false,
	}
}