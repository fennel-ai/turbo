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
	MiniMap,
	Controls
} from 'reactflow';
import 'reactflow/dist/style.css';
import DatasetNode from './DatasetNode';
import PipelineNode from './PipelineNode';
import styles from './DAG.module.scss';

import { getTreeLayout } from './tree';

const elkOptions = {
	'elk.alignment': 'CENTER',
	'elk.algorithm': 'layered',
	'elk.layered.spacing.nodeNodeBetweenLayers': '48',
	'elk.spacing.nodeNode': '32',
	'elk.layered.nodePlacement.bk.fixedAlignment': 'BALANCED',
	'elk.hierarchyHandling': 'INCLUDE_CHILDREN'
};

const proOptions = { hideAttribution: true };

const NODE_TYPES = {
	dataset: DatasetNode,
	pipeline: PipelineNode
};

// Make sure the node/edges props passed here to DAG 
// are memoized/static values to avoid rendering/perf issues
export const DAG = ({ nodes: initialNodes, edges: initialEdges }: { nodes: Node<any>[], edges: Edge<any>[] }) => {
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
	const { fitView } = useReactFlow();

	const onLayout = useCallback(({ direction, useInitialNodes = false }: { direction: LayoutOptions['elk.direction'], useInitialNodes: boolean }) => {
		const opts = { 'elk.direction': direction, ...elkOptions };
		const n = useInitialNodes ? initialNodes : nodes;
		const e = useInitialNodes ? initialEdges : edges;

		// @ts-ignore TODO
		getTreeLayout(n, e, opts).then(({ nodes: layoutedNodes, edges: layoutedEdges }) => {
			setNodes(layoutedNodes);
			setEdges(layoutedEdges);

			window.requestAnimationFrame(() => fitView({
				nodes
			}));
		})
	}, [initialNodes, initialEdges, nodes, edges, setEdges, setNodes, fitView]);

	useLayoutEffect(() => {
		onLayout({ direction: "RIGHT", useInitialNodes: true });

		// (We specifically only want this to run on fresh mount, so skipping lint check for exhaustive hook deps to ensure we don't run again if onLayout is re-memo'd)
	}, []); // eslint-disable-line react-hooks/exhaustive-deps 

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
				<MiniMap />
				<Controls />
			</ReactFlow>
		</div>
	)
}