import type { MdxJsxAttribute, MdxJsxFlowElement } from "mdast-util-mdx-jsx";
import type { Transformer } from 'unified';

import { visit } from "unist-util-visit";

import { findAndReplace } from './findAndReplace';
import { ExampleFileDef } from "./types";

export default function docsnip(): Transformer {
	return async function transformer(tree): Promise<void> {
		let matches: ExampleFileDef[] = [];

		/// Iterate over the tree of nodes and find all the pre elements that have a snippet attribute.
        visit(tree, 'mdxJsxFlowElement', (node: MdxJsxFlowElement) => {
            if (node.name === "pre") {
                const snippet_attr = node.attributes.find(
                    (attr) => (attr as MdxJsxAttribute).name === "snippet"
                );

                if (typeof snippet_attr?.value === 'string') {
                    const [file, snippet_id] = snippet_attr.value.split("#");
                    matches.push({
                        node,
                        file,
                        snippet_id
                    })
                }
            }
        });

		await Promise.all(matches.map(findAndReplace));
	};
} 