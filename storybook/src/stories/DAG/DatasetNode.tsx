import { ReactElement } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import styled from '@emotion/styled';
import KafkaIcon from 'ui/icons/kafka.svg';
import DatasetIcon from 'ui/icons/dataset.svg';

interface NodeData {
	icon: ReactElement;
	label: string;
}

const Root = styled.div<{ selected: boolean }>`
	position: relative;
	background-color: rgba(255, 255, 255, 0.64);
	backdrop-filter: blur(4px);
	border-radius: 0.5rem;
	box-shadow: ${({ selected }) => `0px 0px 0px ${selected ? 2 : 0 }px rgba(93, 76, 190, 0.16), 0px 0px 0px 1px rgba(0, 0, 0, 0.04)` };
	display: flex;
	gap: 0.5rem;
	flex-direction: column;
	padding: 0.75rem;
	transition: box-shadow 160ms ease-out;
	cursor: pointer;
	width: 10rem;
	height: 4rem;
`;

const Title = styled.div`
	display: flex;
	gap: 0.5rem;
	align-items: center;

	& p { 
		margin: 0;
		text-align: center;
		font-variation-settings: "wght" 500;
		color: #000;
		font-size: 1rem;
		line-height: 1rem;
	}
`;

const Meta = styled.div`
	display: flex;
	gap: 0.5rem;
	align-items: center;
	opacity: 0.5;

	& p { 
		margin: 0;
		text-align: center;
		font-variation-settings: "wght" 400;
		color: #000;
		font-size: 0.75rem;
		line-height: 1rem;
	}
`;

const Source = styled.div`
	display: flex;
	gap: 0.25rem;
	align-items: center;

	& svg {
		width: 0.75rem;
		height: 0.75rem;
	}
`;

const handleStyle = { zIndex: -1 };

const DatasetNode = ({ data, selected, ...props }: NodeProps<NodeData>) => {
	return (
		<>
			<Handle
				type="target"
				position={Position.Left}
				id="in"
				style={handleStyle}
			/>
			<Root selected={selected}>
				<Title>
					<DatasetIcon />
					<p>{data.label}</p>
				</Title>
				<Meta>
					<Source>
						<KafkaIcon />
						<p>Kafka</p>
					</Source>
				</Meta>
			</Root>
			<Handle
				type="source"
				position={Position.Right}
				id="out"
				style={handleStyle}
			/>
		</>
	);
};

export default DatasetNode;