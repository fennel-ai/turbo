import { allDocPages, allSections, DocPage, Section } from "contentlayer/generated";
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';

export type ManifestPage = {
	title: string,
	slug: string,
	content: string,
}

export type NavigationPage = {
	title: string,
	slug: string,
}

export type NavigationSection = {
	title: string,
	slug: string,
	order: number,
	pages: NavigationPage[]
}

export type NavigationTree = NavigationSection[];

/**
 * Returns the navigation JSON to the client-side (created in the WithGitbookDocs plugin)
 */
export const getNavigation = (): NavigationTree => {
	const pagesBySection: Record<string, DocPage[]> = groupBy(allDocPages, ({ section }) => section);

	let navigation: NavigationSection[] = Object.entries(pagesBySection).map(([section_slug, pages]) => {
		const section: Section = allSections.find((s) => s.slug === section_slug)!;

		return {
			title: section.title,
			slug: section.slug,
			order: section.order,
			pages: orderBy(pages, 'order').map((page) => ({
				title: page.title || "Page",
				slug: page.slug
			})),
		}
	});

	return orderBy(navigation, 'order')
}
