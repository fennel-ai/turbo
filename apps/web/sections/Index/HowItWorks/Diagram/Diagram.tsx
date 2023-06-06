import { useMemo } from "react";
import styled from "@emotion/styled";
import { media } from "styles/utils";
import { ConnectionLineType, MarkerType, ReactFlow, Background as RFBackground, BackgroundVariant as RFBackgroundVariant, useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';

import KafkaIcon from 'ui/icons/kafka.svg';
import PostgresIcon from 'ui/icons/postgres.svg';
import SnowflakeIcon from 'ui/icons/snowflake.svg';

import DatasetNode from "./DatasetNode";
import SourceNode from "./SourceNode";
import FeatureNode from "./FeatureNode";
import APINode from "./APINode";
import SeparatorNode from "./SeparatorNode";

const Root = styled.div`
	grid-column: 6 / span 7;
	border-radius: 1rem;
	height: 240px;
	border: 1px solid #f0f0f5;
	overflow: hidden;
	order: -1;

	${media("xs")} {
		height: 320px;
	}

	${media("sm")} {
		order: 2;
		height: 456px;
		border-radius: 1.5rem;
	}

	.react-flow__handle {
		opacity: 0;
	}
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
		data: { 
			icon: (
				<PostgresIcon width={24} height={24} color="#035D85" />
			),
			label: "Postgres" 
		},
		position: { x: 0, y: 43 },
	},
	{
		id: 's2',
		type: 'source',
		draggable: false,
		selectable: false,
		sourcePosition: 'right',
		targetPosition: 'left',
		data: { 
			icon: (
				<SnowflakeIcon width={24} height={24} color="#29B5E8" />
			), 
			label: 'Snowflake' 
		},
		position: { x: 0, y: 178 },
	},
	{
		id: 's3',
		type: 'source',
		draggable: false,
		selectable: false,
		sourcePosition: 'right',
		targetPosition: 'left',
		data: { 
			icon: (
				<KafkaIcon width={24} height={24} color="#000000" />
			),
			label: 'Kafka' 
		},
		position: { x: 0, y: 314 },
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
		position: { x: 360, y: 72 },
	},
	{
		id: 'dE',
		type: 'dataset',
		draggable: false,
		selectable: false,
		sourcePosition: 'right',
		targetPosition: 'left',
		data: { label: 'Dataset E' },
		position: { x: 360, y: 232 },
	},
	{
		id: 'separator',
		type: 'separator',
		draggable: false,
		selectable: false,	
		position: {
			x: 500,
			y: -68,
		}
	},
	{
		id: 'f1',
		type: 'feature',
		draggable: false,
		selectable: false,
		sourcePosition: 'left',
		targetPosition: 'right',
		data: { label: 'Feature F1' },
		position: { x: 536, y: 90 },
	},
	{
		id: 'f2',
		type: 'feature',
		draggable: false,
		selectable: false,
		sourcePosition: 'left',
		targetPosition: 'right',
		data: { label: 'Feature F2' },
		position: { x: 536, y: 250 },
	},
	{
		id: 'rA',
		type: 'api',
		draggable: false,
		selectable: false,
		sourcePosition: 'left',
		targetPosition: 'right',
		data: { label: 'REST API' },
		position: { x: 712, y: 168 },
	},
];

const initialEdges = [
	{
		id: 'e:s1-dA',
		source: 's1',
		target: 'dA',
		type: ConnectionLineType.Straight,
		style: {
			strokeWidth: 2,
		},
		animated: true,
		markerEnd: {
			type: MarkerType.Arrow,
			width: 12,
			height: 12,
			strokeWidth: 1.5
		}
	},
	{
		id: 'e:s2-dB',
		source: 's2',
		target: 'dB',
		type: ConnectionLineType.Straight,
		style: {
			strokeWidth: 2,
		},
		animated: true,
		markerEnd: {
			type: MarkerType.Arrow,
			width: 12,
			height: 12,
			strokeWidth: 1.5
		}
	},
	{
		id: 'e:s3-dC',
		source: 's3',
		target: 'dC',
		type: ConnectionLineType.Straight,
		style: {
			strokeWidth: 2,
		},
		animated: true,
		markerEnd: {
			type: MarkerType.Arrow,
			width: 12,
			height: 12,
			strokeWidth: 1.5
		}
	},
	{
		id: 'e:dA-dD',
		source: 'dA',
		target: 'dD',
		type: ConnectionLineType.SmoothStep,
		style: {
			strokeWidth: 2,
		},
		markerEnd: {
			type: MarkerType.Arrow,
			width: 16,
			height: 16,
		}
	},
	{
		id: 'e:dB-dD',
		source: 'dB',
		target: 'dD',
		type: ConnectionLineType.SmoothStep,
		style: {
			strokeWidth: 2,
		},
		markerEnd: {
			type: MarkerType.Arrow,
			width: 16,
			height: 16,
		}
	},
	{
		id: 'e:dB-dE',
		source: 'dB',
		target: 'dE',
		type: ConnectionLineType.SmoothStep,
		style: {
			strokeWidth: 2,
		},
		markerEnd: {
			type: MarkerType.Arrow,
			width: 16,
			height: 16,
		}
	},
	{
		id: 'e:dC-dE',
		source: 'dC',
		target: 'dE',
		type: ConnectionLineType.SmoothStep,
		style: {
			strokeWidth: 2,
		},
		markerEnd: {
			type: MarkerType.Arrow,
			width: 16,
			height: 16,
		}
	},
	{
		id: 'e:rA-f1',
		source: 'rA',
		target: 'f1',
		type: ConnectionLineType.SmoothStep,
		style: {
			strokeWidth: 2,
		},
		markerEnd: {
			type: MarkerType.Arrow,
			width: 16,
			height: 16,
		}
	},
	{
		id: 'e:rA-f2',
		source: 'rA',
		target: 'f2',
		type: ConnectionLineType.SmoothStep,
		style: {
			strokeWidth: 2,
		},
		markerEnd: {
			type: MarkerType.Arrow,
			width: 16,
			height: 16,
		}
	},
	{
		id: 'e:f1-dD',
		source: 'f1',
		target: 'dD',
		targetHandle: 'inB',
		type: ConnectionLineType.Straight,
		style: {
			strokeWidth: 2,
			stroke: '#0B8957',
		},
		markerEnd: {
			type: MarkerType.Arrow,
			width: 16,
			height: 16,
			color: '#0B8957'
		}
	},
	{
		id: 'e:f2-dE',
		source: 'f2',
		target: 'dE',
		targetHandle: 'inB',
		type: ConnectionLineType.Straight,
		style: {
			strokeWidth: 2,
			stroke: '#0B8957',
		},
		markerEnd: {
			type: MarkerType.Arrow,
			width: 16,
			height: 16,
			color: '#0B8957'
		}
	},
];

const Diagram = () => {
	// @ts-ignore
	const [nodes] = useNodesState(initialNodes);
	const [edges] = useEdgesState(initialEdges);
	const nodeTypes = useMemo(() => ({
		dataset: DatasetNode,
		feature: FeatureNode,
		source: SourceNode,
		separator: SeparatorNode,
		api: APINode
	}), []);

	return (
		<Root>
			<ReactFlow
				fitView
				fitViewOptions={{
					nodes: nodes.filter(({ id }) => id !== 'separator')
				}}
				nodes={nodes}
				edges={edges}
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
