import { ReactElement } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import clsx from 'clsx';

import styles from './Node.module.scss';

interface NodeData {
	icon: ReactElement;
	label: string;
}

const handleStyle = { zIndex: -1, opacity: 0 };

const DatasetNode = ({ data, selected, ...props }: NodeProps<NodeData>) => {
	return (
		<>
			<Handle
				type="target"
				position={Position.Left}
				id="in"
				style={handleStyle}
			/>
			<div className={clsx(styles.root, selected ? styles.selected : undefined)}>
				<div className={styles.title}>
					{/** Can replace with Dataset Icon we have in the console */}
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path opacity="0.12" d="M12 8.00024C16.9706 8.00024 21 6.6571 21 5.00024V19.0001C21 20.6601 17 22.0001 12 22.0001C7 22.0001 3 20.6601 3 19.0001V5.00024C3 6.6571 7.02944 8.00024 12 8.00024Z" fill="currentColor" />
						<path d="M21 5C21 6.65685 16.9706 8 12 8C7.02944 8 3 6.65685 3 5M21 5C21 3.34315 16.9706 2 12 2C7.02944 2 3 3.34315 3 5M21 5V19C21 20.66 17 22 12 22C7 22 3 20.66 3 19V5M21 12C21 13.66 17 15 12 15C7 15 3 13.66 3 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>

					<p>{data.label}</p>
				</div>
			</div>
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