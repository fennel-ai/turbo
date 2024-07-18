import path from 'node:path';
import glob from 'fast-glob';
import fs from 'node:fs';
import matter from 'gray-matter';
import { CONTENT_BASE } from "./constants";

const pathToSlug = (input: string) => {
	const ext = path.extname(input);
	return input.replace(CONTENT_BASE + '/', '').replace(ext, '');
};

export interface ContentManifest {
    content: Record<string, Record<string, string>>;
    assets: Record<string, string[]>;
}

export const createContentManifest = (): ContentManifest => {
    const versions = fs.readdirSync(CONTENT_BASE);
    return {
        content: createContentMap(versions),
        assets: createAssetMap(versions),
    }
};

/**
 * Find all markdown files, and create a map with the _actual_ 
 * slugs (usually uses the path but may be overriden by frontmatter.slug)
 * 
 * Returns a Map of actual slug to path of the markdown file.
 */
export const createContentMap = (versions: string[]): Record<string, Record<string, string>> => {
	let obj: Record<string, Record<string, string>> = {};

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

            obj[version][slug] = full_path;
            if(slug.includes("api-reference/")) {
                const parentSlugSplit = slug.split("/");
                const parentSlug = `/${parentSlugSplit[1]}/${parentSlugSplit[2]}`
                if(!obj[version][parentSlug]){
                    obj[version][parentSlug] = full_path
                }
            }
        }
    }

	return obj;
};

export const createAssetMap = (versions: string[]): Record<string, string[]> => {
    let obj: Record<string, string[]> = {};

    for (const version of versions) {
        if (!obj[version]) {
            obj[version] = [];
        }

        const assets = glob.sync([path.join(process.cwd(), 'public', version, 'assets', '**')]);
        obj[version] = assets.map((path) => path.split(version)[1]);
    }

    return obj;
};