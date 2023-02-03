import navigation from '../.content/navigation.json';

export type NavigationPage = {
	title: string,
	path: string,
	slug: string,
}

export type NavigationSection = {
	title: string,
	slug: string,
	order: number,
	pages: NavigationPage[]
}

export type Navigation = NavigationSection[];

/**
 * Returns the navigation JSON to the client-side (created in the WithGitbookDocs plugin)
 */
export const getNavigation = (): Navigation => {
	return navigation
}