import type { Transformer } from 'unified';
import type { Literal, Node, Parent } from 'unist';
import type { MdxJsxAttribute, MdxJsxFlowElement } from 'mdast-util-mdx-jsx';

import { visit, SKIP, CONTINUE } from "unist-util-visit";

const DELIMITER = "===";

export default function codeTabs(): Transformer {
    return function transformer(tree) {
        let inTabGroup = false;
        let startIndex = 0;
        let current: Node[] = [];

        visit(tree, (node, index, parent: Parent) => {
            if (node.type === 'paragraph') {
                let paragraphNode = node as Parent;
                // Get the raw text inside the children array of the paragraph node.
                if (paragraphNode.children && paragraphNode.children.some(child => child.type === 'text')) {
                    const value = (paragraphNode.children[0] as Literal).value as string;
                    if (value === DELIMITER) {
                        if (!inTabGroup) {
                            startIndex = index as number;
                            inTabGroup = true;
                        } else {
                            // If we are inside a tabGroup and see the delimiter once again, 
                            // we can create a CodeTabs node out our current arr, and replace 
                            // all of the nodes stored in current (incl. the `===` delimiters) 
                            // with the new node

                            const activeTab: number = (current as MdxJsxFlowElement[]).findIndex(({ attributes }) => (attributes as MdxJsxAttribute[]).find(({ name, value }) => name === 'active' && !!value));

                            const codeTabNode = {
                                type: 'mdxJsxFlowElement',
                                name: 'CodeTabs',
                                children: current,
                                attributes: [{
                                    type: 'mdxJsxAttribute',
                                    name: 'active',
                                    value: activeTab !== -1 ? activeTab : 0
                                }]
                            };

                            parent.children.splice(startIndex, (index! - startIndex) + 1, codeTabNode); // +1 includes the trailing `===`

                            // Finally clear the state
                            current = [];
                            startIndex = 0;
                            inTabGroup = false;
                        }
                    }
                    // Stop traversing the children of the paragraph node (ignoring the === syntax and move on to the next node)
                    return SKIP;
                }
            } else if (inTabGroup) {
                if (node.type === 'mdxJsxFlowElement' || node.type === 'code') {
                    current.push(node);
                    // Stop traversing the children of the node and move on to the next sibling
                    return SKIP
                }
            } else {
                return CONTINUE
            }
        });
    };
}