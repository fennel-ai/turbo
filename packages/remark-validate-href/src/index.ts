import type { Plugin, Transformer } from 'unified';
import fs from 'node:fs';
import path from 'node:path';
import { Visitor, visit } from 'unist-util-visit';
import { Node } from 'mdast-util-to-string/lib';

import { CONTENT_BASE } from "./constants";
import { createContentMap } from './createContentMap';

const contentMap = createContentMap();

const remarkValidateHref: Plugin = (): Transformer => {
	return (tree) => {
		const link_visitor: Visitor<Node> = (node) => {
			//@ts-ignore
			let url = node.url as string;

			const isExt = url.startsWith('http');

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