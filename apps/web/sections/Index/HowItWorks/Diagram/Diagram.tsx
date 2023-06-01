import { useMemo } from "react";
import styled from "@emotion/styled";
import { ReactFlow, Background as RFBackground, BackgroundVariant as RFBackgroundVariant, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';

import DatasetNode from "./DatasetNode";
import SourceNode from "./SourceNode";
import FeatureNode from "./FeatureNode";
import APINode from "./APINode";

const Root = styled.div`
	grid-column: 6 / span 7;
	border-radius: 1.5rem;
	height: 456px;
	border: 1px solid #f0f0f5;
	overflow: hidden;
`;

const proOptions = { hideAttribution: true };

const initialNodes = [
	{
		id: 's1',
		type: 'source',
		draggable: false,
		selectable: false,
		sourcePosition: 'right',
		targetPosition: 'left',
		data: { label: "Postgres" },
		position: { x: 0, y: 80 },
	},
	{
		id: 's2',
		type: 'source',
		draggable: false,
		selectable: false,
		sourcePosition: 'right',
		targetPosition: 'left',
		data: { label: 'Snowflake' },
		position: { x: 0, y: 160 },
	},
	{
		id: 's3',
		type: 'source',
		draggable: false,
		selectable: false,
		sourcePosition: 'right',
		targetPosition: 'left',
		data: { label: 'Kafka' },
		position: { x: 0, y: 240 },
	},
	{
		id: 'dA',
		type: 'dataset',
		draggable: false,
		selectable: false,
		sourcePosition: 'right',
		targetPosition: 'left',
		data: { label: "Dataset A" },
		position: { x: 160, y: 24 },
	},
	{
		id: 'dB',
		type: 'dataset',
		draggable: false,
		selectable: false,
		sourcePosition: 'right',
		targetPosition: 'left',
		data: { label: 'Dataset B' },
		position: { x: 160, y: 160 },
	},
	{
		id: 'dC',
		type: 'dataset',
		draggable: false,
		selectable: false,
		sourcePosition: 'right',
		targetPosition: 'left',
		data: { label: 'Dataset C' },
		position: { x: 160, y: 296 },
	},
	{
		id: 'dD',
		type: 'dataset',
		draggable: false,
		selectable: false,
		sourcePosition: 'right',
		targetPosition: 'left',
		data: { label: 'Dataset D' },
		position: { x: 360, y: 100 },
	},
	{
		id: 'dE',
		type: 'dataset',
		draggable: false,
		selectable: false,
		sourcePosition: 'right',
		targetPosition: 'left',
		data: { label: 'Dataset E' },
		position: { x: 360, y: 220 },
	},
	{
		id: 'f1',
		type: 'feature',
		draggable: false,
		selectable: false,
		sourcePosition: 'left',
		targetPosition: 'right',
		data: { label: 'Feature F1' },
		position: { x: 616, y: 56 },
	},
	{
		id: 'f2',
		type: 'feature',
		draggable: false,
		selectable: false,
		sourcePosition: 'left',
		targetPosition: 'right',
		data: { label: 'Feature F2' },
		position: { x: 616, y: 264 },
	},
	{
		id: 'rA',
		type: 'api',
		draggable: false,
		selectable: false,
		sourcePosition: 'left',
		targetPosition: 'right',
		data: { label: 'REST API' },
		position: { x: 760, y: 160 },
	},
];

const Diagram = () => {
	const [nodes] = useNodesState(initialNodes);
	const nodeTypes = useMemo(() => ({
		dataset: DatasetNode,
		feature: FeatureNode,
		source: SourceNode,
		api: APINode
	}), []);

	return (
		<Root>
			<ReactFlow
				fitView
				nodes={nodes}
				nodeTypes={nodeTypes}
				nodesDraggable={false}
				nodesConnectable={false}
				panOnDrag={false}
				zoomOnPinch={false}
				zoomOnScroll={false}
				zoomOnDoubleClick={false}
				proOptions={proOptions}
			>
				<RFBackground offset={0} variant={RFBackgroundVariant.Lines} />
			</ReactFlow>
		</Root>	
	);
};

export default Diagram;
