import { Handle, Position } from 'reactflow';
import styled from '@emotion/styled';

interface DataProp {
	label: string;
}

type Props = {
	data: DataProp
};

const Root = styled.div`
	position: relative;
	background-color: #E6FFF5;
	border: 1px solid #B1FBDE;
	border-radius: 0.75rem;
	height: 2.5rem;
	display: flex;
	gap: 0.5rem;
	align-items: center;
	justify-content: center;
	padding: 0 1rem;

	& p { 
		margin: 0;
		text-align: center;
		font-variation-settings: "wght" 500;
		color: #055736;
		font-size: 0.875rem;
		line-height: 1rem;
	}
`;

const FeatureNode = ({ data }: Props) => {
	return (
		<>
			<Handle
				type="target"
				position={Position.Left}
				id="in"
				style={{ zIndex: -1 }}
			/>
			<Root>
				<p>{data.label}</p>
			</Root>
			<Handle
				type="source"
				position={Position.Right}
				id="out"
				style={{ zIndex: -1 }}
			/>
		</>
	);
};

export default FeatureNode;