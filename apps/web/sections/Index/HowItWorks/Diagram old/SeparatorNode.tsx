import { Handle, NodeProps, Position } from 'reactflow';
import styled from '@emotion/styled';

const Root = styled.div`
	position: relative;
	width: 1px;
	height: 536px;
	border-left: 2px dashed #DBDBE6;
	z-index: -10;
`;

const SeparatorNode = (_: NodeProps) => {
	return (
		<>
			{/* <Handle
				type="source"
				position={Position.Left}
				id="out"
				style={{ zIndex: -1 }}
			/> */}
			<Root />
		</>
	);
};

export default SeparatorNode;