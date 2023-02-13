import fs from 'fs-extra';

import navigation from '../.content/navigation.json';
import manifest from '../.content/manifest.json';

export type ManifestPage = {
	title: string,
	path: string,
	slug: string,
}

export type NavigationSection = {
	title: string,
	slug: string,
	order: number,
	pages: ManifestPage[]
}

export type NavigationTree = NavigationSection[];

/**
 * Returns the navigation JSON to the client-side (created in the WithGitbookDocs plugin)
 */
export const getNavigation = (): NavigationTree => {
	return navigation
}

/**
 * Returns the full list of static paths (an array of path params for every possible documentation page)
 * to the client-side.
 */
export const listPaths = () => {
	return Object.keys(manifest).map((slug: string) => {
		return {
			params: {
				slug: slug.split('/')
			}
		}
	})
};

/**
 * Given a slug, return the definition for the relevant page from the manifest.
 */

export const getPageDefinition = (slug: string): ManifestPage => {
	const m = manifest as Record<string, ManifestPage>;
	return m[slug];
}

/**
 * Given a slug, returns the relevant page from the docs in the manifest.
 */
export const getPageContent = async (slug: string): Promise<string> => {
	const page_def = getPageDefinition(slug);

	return fs.readFile(page_def.path, 'utf-8');
}

/**
 * Given a slug, returns the relevant section metadata from the nav manifest.
 */
export const getSection = (slug: string): NavigationSection | undefined => {
	return navigation.find((section) => section.slug === slug);
} 