import type { Transformer } from 'unified';
import type { Literal, Node, Parent } from 'unist';

import { CONTINUE, SKIP, visit } from 'unist-util-visit';

type ContentGroup = {
    index: number;
    nodeCount: number;
}

export default function contentSpec(): Transformer {
    return function transformer(tree) {
        let inGroup = false;
        let startIndex = 0;
        let current: Node[] = [];
        let contentGroups: ContentGroup[] = [];

        const createContentGroup = (node: Node, index: number, parent: Parent) => {
            console.log('creating content group @', startIndex, ':', index - 1, current.map(({ type }) => type));
            const contentGroup = {
                type: 'mdxJsxFlowElement',
                name: 'ContentBlock',
                children: current,
            }

            // @ts-ignore
            console.log(parent.children.map(({ type, name }) => type === 'mdxJsxFlowElement' ? name : type));

            parent.children.splice(startIndex, current.length, contentGroup);

            // @ts-ignore
            console.log(parent.children.map(({ type, name }) => type === 'mdxJsxFlowElement' ? name : type));
        }

        visit(tree, (node, index, parent: Parent) => {            
            let newIndex: number | undefined = index as number;
            //@ts-ignore
            console.log('INDEX', index, node.name || node.type);

            if (node.type === 'heading') {
                if (inGroup) {
                    // If already in a group and we hit a heading,
                    // create the current group and clear the state
                    createContentGroup(node, index as number, parent);
                    newIndex = startIndex + 1;

                    inGroup = false;
                    current = [];
                    startIndex = 0;
                }

                inGroup = true;
                startIndex = newIndex as number;
                console.log('new startIndex', startIndex);
            }

            if (inGroup) {
                console.log('adding ', index, node.type)
                current.push(node);
            }

            // Check if this is the last node in the page, and close out the group
            // if we are inside of one.
            if (inGroup && parent?.type === 'root' && index === parent.children.length - 1) {
                createContentGroup(node, index as number, parent);
            }

            // Return skip every time apart from on the root node. This ensures we never traverse children 
            // and only care about the top-most nodes.
            return [node.type === 'root' ? CONTINUE : SKIP, newIndex + 1];
        })
    };
}