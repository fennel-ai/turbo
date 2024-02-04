import path from 'node:path';
import glob from 'fast-glob';
import fs from 'node:fs';
import matter from 'gray-matter';
import { CONTENT_BASE } from "./constants";

const pathToSlug = (input: string) => {
	const ext = path.extname(input);
	return input.replace(CONTENT_BASE + '/', '').replace(ext, '');
};

/**
 * Find all markdown files, and create a map with the _actual_ 
 * slugs (usually uses the path but may be overriden by frontmatter.slug)
 * 
 * Returns a Map of actual slug to path of the markdown file.
 */
export const createContentMap = (): Record<string, string> => {
	const pages = glob.sync([path.join(CONTENT_BASE, '**', '*.md')]);

	let obj: Record<string, string> = {};

	for (const [full_path, original_slug] of pages.map((p) => [p, pathToSlug(p)])) {
		let slug = original_slug;

		const file = fs.readFileSync(full_path, 'utf8');
		const { data } = matter(file) as { data: { slug?: string } };

		if (data.slug) {
			slug = data.slug;
		};
		
		if (!slug.startsWith('/')) {
			slug = `/${slug}`;
		}

		obj[slug] = full_path;
	}

	return obj;
};
