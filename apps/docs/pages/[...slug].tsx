import { GetStaticPaths, GetStaticProps } from "next";
import { getNavigation, getPage, listPaths, ManifestPage, Navigation } from "../lib/getNavigation";

type Props = {
	navigation: Navigation,
	page: ManifestPage,
}

export default function DocPage({ navigation, page }: Props) {
	return (
		<div>
			<h1>{page.title}</h1>
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

export const getStaticProps: GetStaticProps<Props> = (ctx) => {
	const navigation = getNavigation();
	
	const { params } = ctx;
	const slug = (params!.slug as string[]).join('/');

	const page = getPage(slug);

	return {
		props: {
			navigation,
			page,
		}
	}
}

export const getStaticPaths: GetStaticPaths = () => {
	const paths = listPaths();
	return {
		paths: paths,
		fallback: false,
	}
}