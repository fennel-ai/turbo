import { allDocPages, allSections, DocPage, Section } from "contentlayer/generated";
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';

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

export const allPages = process.env.NODE_ENV === 'production' ? allDocPages.filter(page => page.status !== 'draft') : allDocPages;

/**
 * Returns the navigation JSON to the client-side (created in the WithGitbookDocs plugin)
 */
export const getNavigation = (): NavigationTree => {
	const pagesBySection: Record<string, DocPage[]> = groupBy(allPages, ({ section }) => section);

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

export const getPageData = (pageSlug: string): { code: string, section: Section, page: Partial<DocPage> } => {
	const {
		body,
		description = "",
		section,
		title,
		order,
		status,
		slug
	} = allPages.find((page) => page.slug === pageSlug)!;
	
	return {
		code: body.code,
		section: allSections.find((s) => s.slug === section)!,
		page: {
			description,
			title,
			order,
			status,
			slug,
		}
	}
}