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

export type Navigation = NavigationSection[];

/**
 * Returns the navigation JSON to the client-side (created in the WithGitbookDocs plugin)
 */
export const getNavigation = (): Navigation => {
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
 * Given a slug, returns the relevant page from the docs in the manifest.
 */
export const getPage = (slug: string): ManifestPage => {
	const m = manifest as Record<string, ManifestPage>;
	return m[slug];
}
