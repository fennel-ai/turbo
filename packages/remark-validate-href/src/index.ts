import type { Plugin, Transformer } from 'unified';
import fs from 'node:fs';
import path from 'node:path';
import { Visitor, visit } from 'unist-util-visit';
import { Node } from 'mdast-util-to-string/lib';

import { CONTENT_BASE } from "./constants";
import { createContentMap } from './createContentMap';

const contentMap = createContentMap();

// TODO: Validate image src attributes similarly.
const remarkValidateHref: Plugin = (): Transformer => {
	return (tree) => {
		const link_visitor: Visitor<Node> = (node) => {
			//@ts-ignore
			let url = node.url as string;

			const isExt = url.startsWith('http');

			//! Here we are essentially ignoring the header anchor links for now
			//! this is a little more complex as we need rehype to run for the heading IDs to be present on each `node`
			//! Need to work out a way around this when running the validator via remark-cli.
			if (url.includes('#')) {
				url = url.split("#")[0];
			}

			if (!isExt) {

				let full_path = path.join(CONTENT_BASE, `${url}.md`);

				if (contentMap[url]) {
					full_path = contentMap[url];
				}

				try {
					fs.accessSync(full_path);
				} catch (err) {
					// @ts-ignore
					throw `Broken link: ${url} @ ${node.position.start.line}:${node.position.start.offset}`;
				}
			}
		}

		visit(tree, 'link', link_visitor);
	}
}

export default remarkValidateHref;