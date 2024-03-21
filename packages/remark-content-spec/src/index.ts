import type { Transformer } from 'unified';
import type { Literal, Node, Parent } from 'unist';
import type { MdxJsxFlowElement } from 'mdast-util-mdx-jsx';

import { CONTINUE, SKIP, visit } from 'unist-util-visit';

const BREAKOUT_TYPES = ['code', 'image', 'pre'];

export default function contentSpec(): Transformer {
    return function transformer(tree) {
        const groups: Node[][] = [[]];
        let current: Node[] = [];

        const createGroup = () => {
            if (!!current.length) {
                groups.push(current);
                current = [];
            }
        };

        visit(tree, (node, index, parent) => {
            if (node.type === 'root' || node.type === 'mdxjsEsm' || node.type === 'yaml') {
                return;
            }

            const nodeType = node.type === 'mdxJsxFlowElement' ? (node as MdxJsxFlowElement).name as string : node.type;

            if ((BREAKOUT_TYPES.includes(nodeType) || nodeType === 'heading') && !!current.length) {
                createGroup()
            }
            console.log(node, current);
            current.push(node);

            if (BREAKOUT_TYPES.includes(nodeType)) {
                createGroup();
            }
            
            return SKIP;
        });

        groups.push(current);

        (tree as Parent).children = groups
            .filter(children => !!children.length)
            .map(children => children.length === 1 ? children[0] : ({
                type: 'mdxJsxFlowElement',
                name: 'ContentBlock',
                children,
            }))
    }
}