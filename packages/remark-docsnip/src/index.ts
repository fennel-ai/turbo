import type { MdxJsxAttribute, MdxJsxFlowElement } from "mdast-util-mdx-jsx";
import type { Transformer } from 'unified';
import type { ArrayExpression, Directive, SimpleLiteral } from 'estree';

import { visit, Visitor } from "unist-util-visit";

import { findAndReplace } from './findAndReplace';
import { ExampleFileDef, SnippetIdentifier } from "./types";
import { MdxJsxAttributeValueExpression } from "mdast-util-mdx-jsx/lib";

/**
 * Take the MdxJsxAttributeValueExpression object generated from passing an array of strings to the
 * snippet prop of a pre block in the source markdown, and deeply retrieves the string values representing
 * each snippet. 
 */
const getTabbedSnippets = (attr: MdxJsxAttributeValueExpression | undefined): string[] => {
    if (!attr) {
        return [];
    }
    const propExpression = (attr.data?.estree?.body[0] as Directive).expression as unknown;
    return ((propExpression as ArrayExpression).elements as SimpleLiteral[]).map(({ value }) => value as string);
};

/**
 * Takes the `snippet` attribute string from pre tags in the source markdown and creates a 
 * value SnippetIdentifier object.
 */
const createSnippetIdentifier = (value: string): SnippetIdentifier => {
    const [file, snippet_id] = value.split("#");

    return {
        file,
        snippet_id
    }
}

export default function docsnip(): Transformer {
	return async function transformer(tree): Promise<void> {
		let matches: ExampleFileDef[] = [];

		/// Iterate over the tree of nodes and find all the pre elements that have a snippet attribute.
		const visitor: Visitor<MdxJsxFlowElement> = (node) => {
			if (node.name === "pre") {
				const snippet_attr = node.attributes.find(
					(attr) => (attr as MdxJsxAttribute).name === "snippet"
				);

				if (typeof snippet_attr?.value === 'string') {
                    matches.push({
                        node,
                        snippets: [createSnippetIdentifier(snippet_attr.value)]
                    })
                } else if (snippet_attr?.value !== null && typeof snippet_attr?.value === 'object') {
                    const tabbedSnippets = getTabbedSnippets(snippet_attr?.value);
                    matches.push({
                        node,
                        snippets: tabbedSnippets.map(createSnippetIdentifier)
                    });
                }
			}
		}; 

		visit(tree, 'mdxJsxFlowElement', visitor);

		await Promise.all(matches.map(findAndReplace));
	};
}