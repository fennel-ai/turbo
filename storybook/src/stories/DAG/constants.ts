import type { Edge, Node} from 'reactflow';

const position = { x: 0, y: 0 };

export const NODES: Node<any>[] = [
	{
		id: '1',
		type: 'dataset',
		data: {
			label: "Dataset 1"
		},
		position,
	},
	{
		id: '2',
		type: 'dataset',
		data: {
			label: "Dataset 2"
		},
		position,
	},
	{
		id: '3',
		type: 'dataset',
		data: {
			label: "Dataset 3"
		},
		position,
	},
	{
		id: '4',
		type: 'dataset',
		data: {
			label: "Dataset 4"
		},
		position,
		selected: true, // defaults to true for the primary node 
	},
	{
		id: '5',
		type: 'dataset',
		data: {
			label: "Dataset 5"
		},
		position,
	},
	{
		id: '6',
		type: 'dataset',
		data: {
			label: "Dataset 6"
		},
		position,
	},
];

export const EDGES: Edge<any>[] = [
	{
		id: 'edge_1',
		source: "1",
		target: "4",
		type: 'smoothstep'
	},
	{
		id: 'edge_2',
		source: "2",
		target: "4",
		type: 'smoothstep'
	},
	{
		id: 'edge_3',
		source: "3",
		target: "4",
		type: 'smoothstep'
	},
	{
		id: 'edge_4',
		source: "4",
		target: "5",
		type: 'smoothstep'
	},
	{
		id: 'edge_5',
		source: "4",
		target: "6",
		type: 'smoothstep'
	},
];