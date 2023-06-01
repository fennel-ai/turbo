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
	background-color: #F0F0F5;
	border: 1px solid #DBDBE6;
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
		color: #2F2F41;
		font-size: 0.875rem;
		line-height: 1rem;
	}
`;

const APINode = ({ data }: Props) => {
	return (
		<>
			<Handle
				type="source"
				position={Position.Left}
				id="out"
				style={{ zIndex: -1 }}
			/>
			<Root>
				<p>{data.label}</p>
			</Root>
		</>
	);
};

export default APINode;