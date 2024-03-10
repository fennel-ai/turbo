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
export const createContentMap = (): Record<string, Record<string, string>> => {
	let obj: Record<string, Record<string, string>> = {};

    const versions = fs.readdirSync(CONTENT_BASE);

    for (const version of versions) {
        if (!obj[version]) {
            obj[version] = {};
        }

        const pages = glob.sync([path.join(CONTENT_BASE, version, 'pages', '**', '*.md')]);

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

            slug = slug.replace(new RegExp(`/${version}/pages`, 'g'), '');

            console.log(full_path, slug);

            obj[version][slug] = full_path;
        }
    }

	return obj;
};
