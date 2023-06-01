import styled from "@emotion/styled";
import { ReactFlow, Background as RFBackground, BackgroundVariant as RFBackgroundVariant, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import DatasetNode from "./DatasetNode";
import { useMemo } from "react";

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
		sourcePosition: 'right',
		targetPosition: 'left',
		data: { label: "Postgres" },
		position: { x: 0, y: 80 },
	},
	{
		id: 's2',
		sourcePosition: 'right',
		targetPosition: 'left',
		data: { label: 'Snowflake' },
		position: { x: 0, y: 160 },
	},
	{
		id: 's3',
		sourcePosition: 'right',
		targetPosition: 'left',
		data: { label: 'Kafka' },
		position: { x: 0, y: 240 },
	},
	{
		id: 'dA',
		type: 'dataset',
		sourcePosition: 'right',
		targetPosition: 'left',
		data: { label: "Dataset A" },
		position: { x: 200, y: 40 },
	},
	{
		id: 'dB',
		type: 'dataset',
		sourcePosition: 'right',
		targetPosition: 'left',
		data: { label: 'Dataset B' },
		position: { x: 200, y: 160 },
	},
	{
		id: 'dC',
		type: 'dataset',
		sourcePosition: 'right',
		targetPosition: 'left',
		data: { label: 'Dataset C' },
		position: { x: 200, y: 280 },
	},
	{
		id: 'dD',
		type: 'dataset',
		sourcePosition: 'right',
		targetPosition: 'left',
		data: { label: 'Dataset D' },
		position: { x: 400, y: 100 },
	},
	{
		id: 'dE',
		type: 'dataset',
		sourcePosition: 'right',
		targetPosition: 'left',
		data: { label: 'Dataset E' },
		position: { x: 400, y: 220 },
	},
	{
		id: 'f1',
		sourcePosition: 'left',
		targetPosition: 'right',
		data: { label: 'Feature F1' },
		position: { x: 680, y: 56 },
	},
	{
		id: 'f2',
		sourcePosition: 'left',
		targetPosition: 'right',
		data: { label: 'Feature F2' },
		position: { x: 680, y: 264 },
	},
	{
		id: 'rA',
		sourcePosition: 'left',
		targetPosition: 'right',
		data: { label: 'REST API' },
		position: { x: 880, y: 160 },
	},
];

const Diagram = () => {
	const [nodes] = useNodesState(initialNodes);
	const nodeTypes = useMemo(() => ({
		dataset: DatasetNode,
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
