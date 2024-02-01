import type { MdxJsxAttribute, MdxJsxFlowElement } from "mdast-util-mdx-jsx";
import type { Transformer } from 'unified';
import { visit, Visitor } from "unist-util-visit";

import { findAndReplace } from './findAndReplace';
import { ExampleFileDef } from "./types";

export default function docsnip(): Transformer {
	return async function transformer(tree): Promise<void> {
		let matches: ExampleFileDef[] = [];
		let nestedNodes: ExampleFileDef[] = []

		/// Iterate over the tree of nodes and find all the pre elements that have a snippet attribute.
		const visitor: Visitor<MdxJsxFlowElement> = (node, index, parent) => {
			if (node.name === "pre") {
				const snippet_attr = node.attributes.find(
					(attr) => (attr as MdxJsxAttribute).name === "snippet"
				);




				if (snippet_attr?.value) {
					const [file, snippet_id] = (snippet_attr.value as string).split("#");
					if(parent?.type!=="root"){
						nestedNodes.push({
							node,
							file,
							snippet_id
						})
					} else {
						matches.push({
							index,
							file,
							snippet_id,
						})
					}
				}
			}
		}; 

		visit(tree, 'mdxJsxFlowElement', visitor);

		await Promise.all(matches.map(async (match) => findAndReplace(match, tree)));
		await Promise.all(nestedNodes.map(async (node) => findAndReplace(node, tree)));
	};
}