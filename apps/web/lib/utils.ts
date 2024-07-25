import { Page } from "contentlayer/generated";

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
