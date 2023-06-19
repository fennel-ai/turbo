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
		// selected: true, // defaults to true for the primary node 
	},
	{
		id: 'pipeline_1',
		type: 'pipeline',
		data: {
			label: "Pipeline Name",
		},
		position,
	},
	{
		id: 'pipeline_2',
		type: 'pipeline',
		data: {
			label: "Pipeline Name",
		},
		position,
	}
];

export const EDGES: Edge<any>[] = [
	{
		id: 'edge_1',
		source: "1",
		target: "pipeline_1",
		targetHandle: 'in',
		type: 'smoothstep',
		animated: true
	},
	{
		id: 'edge_2',
		source: "2",
		target: "pipeline_1",
		targetHandle: 'in',
		type: 'smoothstep',
		animated: true
	},
	{
		id: 'p1',
		source: "pipeline_1",
		target: "3",
		type: 'smoothstep',
		animated: true
	},
	{
		id: 'p2',
		source: "3",
		target: "pipeline_2",
		type: 'smoothstep',
		animated: true
	},
	{
		id: 'p3',
		source: "pipeline_2",
		target: "4",
		type: 'smoothstep',
		animated: true
	},
];