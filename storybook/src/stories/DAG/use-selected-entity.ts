import { useStore } from 'reactflow';

export const useSelectedEntity = () => {
	const selectedNode = useStore(state => {
		let node = state.getNodes().find(({ selected }) => selected);
		return node ? { ...node, type: 'dataset' } : undefined;
	});

	const selectedEdge = useStore(state => {
		let edge = state.edges.find(({ selected }) => selected);
		return edge ? { ...edge, type: 'pipeline' } : undefined;
	});

	return selectedNode || selectedEdge;
};