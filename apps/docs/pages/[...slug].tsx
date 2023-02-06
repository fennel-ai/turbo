import { GetStaticPaths, GetStaticProps } from "next";
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import { getNavigation, getPage, listPaths, Navigation } from "lib/utils";
import Layout from 'components/Layout';

type Props = {
	navigation: Navigation,
	source: MDXRemoteSerializeResult,
}

export default function DocPage({ navigation, source }: Props) {
	return (
		<Layout navigation={navigation}>
			<MDXRemote {...source} />
		</Layout>
	);
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
	const navigation = getNavigation();
	
	const { params } = ctx;
	const slug = (params!.slug as string[]).join('/');

	const page = await getPage(slug);
	const source = await serialize(page, { parseFrontmatter: true });

	return {
		props: {
			navigation,
			source,
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