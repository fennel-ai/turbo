import { allPages, version } from "contentlayer/generated";
import { GetServerSideProps } from "next";

/**
 * After launching the API reference we had an issue where many of the titles were being scraped more than once by Algolia.
 * This was originally due to having all of the API Reference pages in allPages (this has now changed so that we have allPages and
 * allAPIPages.) However, because all API Reference pages are the exact same (there is actually only /api-reference/ and everything
 * else is handled on the client.) this meant that each URL was being indexed by algolia and things were being duplicated.
 *
 * e.g. we had `<h1>Client</h1>` appearing for every possible API reference path.
 * 
 * Now we can just map over allPages as before, and include /docs/api-reference by hand as the only URL that should be scraped by algolia.
 */
function generateSiteMap() {
	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://fennel.ai/docs</loc>
    </url>
    ${
        allPages
            .filter(({ status }) => status !== 'draft')
            .map(({ slug }) => {
                return `
    <url>
        <loc>${`https://fennel.ai/docs/${slug}`}</loc>
    </url>`;
            })
            .join('')
    }
    <url>
        <loc>${`https://fennel.ai/docs/api-reference`}</loc>
    </url>
    ${
        version.versions?.map(({ name }) => `
    <url>
        <loc>${`https://fennel.ai/docs/api-reference/${name}`}</loc>
    </url>
        `) || null
    }
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