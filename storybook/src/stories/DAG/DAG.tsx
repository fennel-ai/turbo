import { useCallback, useLayoutEffect } from 'react';
import type { LayoutOptions } from 'elkjs';
import { 
	Node, 
	Edge, 
	ReactFlow, 
	Background as RFBackground, 
	BackgroundVariant as RFBackgroundVariant, 
	useEdgesState, 
	useNodesState,
	useReactFlow,
	useStore,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion } from 'framer-motion';
import DatasetNode from './DatasetNode';
import styles from './DAG.module.scss';

import { EDGES, NODES } from './constants';
import { getTreeLayout } from './tree';
import { useSelectedEntity } from './use-selected-entity';

const elkOptions = {
	'elk.algorithm': 'layered',
	'elk.layered.spacing.nodeNodeBetweenLayers': '100',
	'elk.spacing.nodeNode': '80',
};

const proOptions = { hideAttribution: true };

const NODE_TYPES = {
	dataset: DatasetNode,
};

export const DAG = ({ nodes: initialNodes, edges: initialEdges }: { nodes: Node<any>[], edges: Edge<any>[] }) => {
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
	const { fitView } = useReactFlow();

	const onLayout = useCallback(({ direction, useInitialNodes = false }: { direction: LayoutOptions['elk.direction'], useInitialNodes: boolean }) => {
		const opts = { 'elk.direction': direction, ...elkOptions };
		const n = useInitialNodes ? NODES : nodes;
		const e = useInitialNodes ? EDGES : edges;

		// @ts-ignore TODO
		getTreeLayout(n, e, opts).then(({ nodes: layoutedNodes, edges: layoutedEdges }) => {
			setNodes(layoutedNodes);
			setEdges(layoutedEdges);

			window.requestAnimationFrame(() => fitView({
				nodes
			}));
		})
	}, [nodes, edges, setEdges, setNodes, fitView]);

	useLayoutEffect(() => {
		onLayout({ direction: "RIGHT", useInitialNodes: true });
	}, []); // eslint-disable-line react-hooks/exhaustive-deps 
	// (We specifically only want the above hook to run on mount)

	const selected = useSelectedEntity();

	return (
		<div className={styles.root}>
			<ReactFlow
				fitView
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				nodeTypes={NODE_TYPES}
				nodesDraggable={false}
				nodesConnectable={false}
				proOptions={proOptions}
			>
				<RFBackground variant={RFBackgroundVariant.Lines} />
			</ReactFlow>
		</div>
	)
}