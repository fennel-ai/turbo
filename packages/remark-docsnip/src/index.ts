import type { MdxJsxAttribute, MdxJsxFlowElement } from "mdast-util-mdx-jsx";
import type { Transformer } from 'unified';
import { visit, Visitor } from "unist-util-visit";

import { extractSnippet } from './extractSnippet';

export type ExampleFileDef = {
	index: number | null; // The index of the mdx node in the tree
	file: string; // The file name of the example
	snippet_id: string; // The id of the snippet
}

export default function docsnip(): Transformer {
	return async function transformer(tree): Promise<void> {
		let matches: ExampleFileDef[] = [];

		const visitor: Visitor<MdxJsxFlowElement> = (node, index) => {
			if (node.name === "pre") {
				const snippet_attr = node.attributes.find(
					(attr) => (attr as MdxJsxAttribute).name === "snippet"
				);

				if (snippet_attr?.value) {
					const [file, snippet_id] = (snippet_attr.value as string).split("#");

					matches.push({
						index,
						file,
						snippet_id,
					})
				}
			}
		}; 

		visit(tree, 'mdxJsxFlowElement', visitor);

		await Promise.all(matches.map(async (match) => extractSnippet(match, tree)));
	};
}
