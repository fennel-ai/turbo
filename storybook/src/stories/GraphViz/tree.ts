import ELK from 'elkjs';
import type { ElkNode, LayoutOptions } from 'elkjs';
import {
	Node, 
	Edge
} from 'reactflow';

const elk = new ELK();

export const getTreeLayout = (nodes: Node<any>[], edges: Edge<any>[], options: LayoutOptions = {}) => {
	const isHorizontal = options?.['elk.direction'] === 'RIGHT';

	const graph: ElkNode = {
		id: 'root',
		layoutOptions: options,
		children: nodes.map(node => ({
			...node,
			targetPosition: isHorizontal ? 'left' : 'top',
			sourcePosition: isHorizontal ? 'right' : 'bottom',
			width: 160,
			height: 64,
		})),
		// @ts-ignore TODO
		edges,
	};

	return elk
		.layout(graph)
		.then((layoutedGraph) => ({
			nodes: layoutedGraph!.children!.map(node => ({
				...node,
				position: { x: node.x, y: node.y },
			})),
			edges: layoutedGraph.edges,
		}))
		.catch(console.error);
}