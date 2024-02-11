import type { Transformer } from 'unified';
import type { Literal, Node, Parent } from 'unist';
import type { MdxJsxFlowElement } from 'mdast-util-mdx-jsx';

import { CONTINUE, SKIP, visit } from 'unist-util-visit';

const BREAKOUT_TYPES = ['code', 'image', 'pre'];

export default function contentSpec(): Transformer {
    return function transformer(tree) {
        const groups: Node[][] = [[]];

        const guardAddGroup = (index: number | null) => {
            if (!!groups[groups.length - 1].length && index !== (tree as Parent).children.length -1) {
                groups.push([]);
            }
        };

        visit(tree, (node, index, parent) => {
            if (node.type === 'root') return CONTINUE;
            if (node.type === 'mdxjsEsm' || node.type === 'yaml') return SKIP;

            const nodeType = node.type === 'mdxJsxFlowElement' ? (node as MdxJsxFlowElement).name as string : node.type;

            if (BREAKOUT_TYPES.includes(nodeType)) {
                guardAddGroup(index);
                groups[groups.length - 1].push(node);
                guardAddGroup(index);
            } else {
                if (node.type === 'heading') {
                    guardAddGroup(index);
                }
                groups[groups.length - 1].push(node);
            }
            
            return SKIP;
        });

        (tree as Parent).children = groups
            .filter(children => !!children.length)
            .map(children => children.length === 1 ? children[0] : ({
                type: 'mdxJsxFlowElement',
                name: 'ContentBlock',
                children,
            }))
    }
}