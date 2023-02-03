import path from "node:path";
import fs from "fs-extra";
import slugify from 'slugify';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toString } from "mdast-util-to-string";
import { visit } from "unist-util-visit";

const createSlug = (str) => slugify(str.replace(/\//gu, "-"), { lower: true });

export const createManifest = async (dir) => {
  // Currently the manifest only stores the sections.
  // Nested within these are arrays of pages in order, 
  // which we can use to construct the static paths for Next.
  let navigation = [];
  let manifest = {};

  const summary = await fs.readFile(path.join(dir, 'SUMMARY.md'), 'utf-8');

  // Convert markdown to ast
  const ast = fromMarkdown(summary);

  let sectionOrder = 0;

  // Find all lists
  visit(ast, 'list', async (node, index, parent) => {
	// get the item before the list node (the section heading)
	const title = toString(parent.children[index - 1]);

	let section = {
		title,
		slug: createSlug(title),
		order: sectionOrder,
		pages: [],
	};

	node.children.forEach((n) => {
		// Get a ref to the link element itself
		const link = n.children[0].children[0];

		// Join dir with the link url to construct the path to the md file.
		const fullPath = path.join(dir, link.url);

		const title = toString(link);

		let page = {
			title,
			path: fullPath,
			slug: createSlug(title),
		};

		// Add the page to the manifest with the key set to the combined 
		// section & page slug for rapid lookup.
		let key = [section.slug, page.slug].join('/');
		manifest[key] = page;

		// add the page to the sections obj
		section.pages.push(page);
	});
	
	// Add the section to navigation map
	navigation.push(section);
	sectionOrder++;
  })
  

  await fs.writeJSON(path.join(dir, "../", "navigation.json"), navigation);
  await fs.writeJSON(path.join(dir, "../", "manifest.json"), manifest);
};
