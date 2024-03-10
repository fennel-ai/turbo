import { allAPIConfigs, allPages, allAPIPages, allConfigs, Page, APIPage, APIConfig, Config } from "contentlayer/generated";
import { GetServerSidePropsContext, GetStaticPropsContext } from "next";
import path from 'node:path';
import { ParsedUrlQuery } from "node:querystring";

export type NavigationPage = {
	description?: string;
	title: string;
	slug: string;
	status: Page['status'];
	body: {
		code: string;
		_raw: string;
	};
	_id: string;
}

export type Outline = {
	level: number, title: string
}[]

export type NavigationSection = {
	title: string;
	slug: string;
	pages: NavigationPage[];
}

export type NavigationTree = NavigationSection[];

export const shouldPublish = (page: Page | APIPage): boolean => process.env.NODE_ENV !== 'production' || page.status !== 'draft';

/**
 * Returns the navigation tree from the config.yml file in the content directory.
 */
export const getNavigation = (version: string, api?: boolean): NavigationTree => {
    const configs: (Config | APIConfig)[] = (api ? allAPIConfigs : allConfigs);
    const config: Config | APIConfig | undefined = configs.find((c) => c.version === version);;
    const pages: (Page | APIPage)[] = api ? allAPIPages : allPages;

    if (!config) {
        throw new Error(`[config.sidebar]: Could not find config yaml file for version: ${version}`);
    };
	
    const { sidebar } = config;

	return sidebar!.map((section) => ({
		...section,
		pages: section.pages.map((slug: string) => {
            let versionedSlug = config!.version === 'main' ? slug : path.join(config!.version, slug);
            if (versionedSlug.endsWith('/') && versionedSlug !== '/') {
                versionedSlug = versionedSlug.slice(0, -1)
            }

			const page = pages.find((page) => page.slug === versionedSlug);

			if (!page) throw new Error(`[config.sidebar]: Could not find page with slug "${versionedSlug}" in sidebar config. Make sure that the slug is correct and that the page exists in the "content" directory.`);

			return {
				title: page.title,
                slug: page.slug,
				status: page.status,
			}
		}).filter(shouldPublish)
	}));
}

/**
 * Get the page metadata, section data and markdown code for a given page slug.
 */
export const getPageData = (pageSlug: string, api?: boolean): { code: string, section: NavigationSection, page: Partial<NavigationPage>, headings: Outline, version: string } => {
    const configs: (Config | APIConfig)[]  = api ? allAPIConfigs : allConfigs;
    const pages: (Page | APIPage)[] = api ? allAPIPages : allPages;

	const {
		body,
		description = "",
		section,
		title,
		status,
		slug,
		headings,
		_id,
        version,
	} = pages.find((page) => page.slug === pageSlug)!;

    const config = configs.find((c) => c.version === version)!;

    if (!config) throw new Error(`[config.sidebar]: Could not find config yaml file for version: ${version}`);
	
    return {
		code: body.code,
		section: config.sidebar!.find((s) => s.slug === section)!,
		headings,
		page: {
			description,
			title,
			status,
			slug: slug!, // Slug is computed if not present so although it's optional in the contentlayer schema (i.e. it's not a hard requirement in the frontmatter), it will always be present here
			_id,
		},
        version
	}
}

/**
 * Get the requested version number from the path params. The version number is always the first part of the slug following the page
 * url i.e. /docs/[version]/[[...slug]] || /docs/api-reference/[version]/[[...slug]]. For content from "latest"/main, there is no 
 * version number present in the slug.
 */
export const getRequestedVersionId = (params: ParsedUrlQuery | undefined): string => {
    let version = 'main';
    if (params!.slug?.[0].match(/\d+\.\d+\.\d+/gm)) {
        version = params!.slug[0];
    }

    return version;
}