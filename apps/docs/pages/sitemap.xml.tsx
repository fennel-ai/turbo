import { allPages } from "contentlayer/generated";
import { GetServerSideProps } from "next";

function generateSiteMap() {
	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url>
	<loc>https://fennel.ai/docs</loc>
	</url>
	${allPages
		.map(({ slug }) => {
			return `
	<url>
		<loc>${`https://fennel.ai/docs/${slug}`}</loc>
	</url>
	`;
		})
		.join('')}
</urlset>
 `;
}

export default function SiteMap() {
	return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	const sitemap = generateSiteMap();

	res.setHeader('Content-Type', 'text/xml');

	res.write(sitemap);
	res.end();

	return {
		props: {},
	}
}