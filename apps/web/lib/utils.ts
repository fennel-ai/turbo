import { allPages, config, Page } from "contentlayer/generated";

export type NavigationPage = {
	description?: string;
	title: string;
	slug: string;
	status: Page['status'];
	date?: string;
}

export type NavigationSection = {
	title: string;
	slug: string;
	pages: NavigationPage[];
}

export type NavigationTree = {
	items: string[];
	active: string;
}

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
