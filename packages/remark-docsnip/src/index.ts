import type { Parent } from "unist-util-visit/lib";
import type { MdxJsxAttribute, MdxJsxFlowElement } from "mdast-util-mdx-jsx";
import type { Transformer } from 'unified';
import type { VFile } from 'vfile';

import { visit } from "unist-util-visit";

import { findAndReplace } from './findAndReplace';
import { ExampleFileDef } from "./types";

export default function docsnip(): Transformer {
	return async function transformer(tree, file: VFile): Promise<void> {
		let matches: ExampleFileDef[] = [];

        const fileData = file.data.rawDocumentData as Record<string, string>;
        const [version] = fileData.sourceFileDir.split('/');

		/// Iterate over the tree of nodes and find all the pre elements that have a snippet attribute.
        visit(tree, 'mdxJsxFlowElement', (node: MdxJsxFlowElement, i: number, parent: Parent) => {
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

		await Promise.all(matches.map((m) => findAndReplace(m, version)));
	};
} 