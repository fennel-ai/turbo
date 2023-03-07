import { allPages, config, Page } from "contentlayer/generated";

export type NavigationPage = {
	description?: string;
	title: string;
	slug: string;
	status: Page['status'];
}

export type NavigationSection = {
	title: string;
	slug: string;
	pages: NavigationPage[];
}

export type NavigationTree = NavigationSection[];

export const shouldPublish = (page: Page): boolean => process.env.NODE_ENV !== 'production' || page.status !== 'draft';

/**
 * Returns the navigation tree from the config.yml file in the content directory.
 */
export const getNavigation = (): NavigationTree => {
	const { sidebar } = config;
	return sidebar!.map((section) => ({
		...section,
		pages: section.pages.map((slug: string) => {
			const page = allPages.find((page: Page) => page.slug === slug)!;
			
			if (!page) throw new Error(`[config.sidebar]: Could not find page with slug "${slug}" in sidebar config. Make sure that the slug is correct and that the page exists in the "content" directory.`);

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
export const getPageData = (pageSlug: string): { code: string, section: NavigationSection, page: NavigationPage } => {
	const {
		body,
		description = "",
		section,
		title,
		status,
		slug
	} = allPages.find((page) => page.slug === pageSlug)!;
	
	return {
		code: body.code,
		section: config.sidebar!.find((s) => s.slug === section)!,
		page: {
			description,
			title,
			status,
			slug: slug!, // Slug is computed if not present so although it's optional in the contentlayer schema (i.e. it's not a hard requirement in the frontmatter), it will always be present here
		}
	}
}