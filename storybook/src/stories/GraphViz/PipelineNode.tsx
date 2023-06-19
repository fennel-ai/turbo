import { Handle, Position, NodeProps } from 'reactflow';
import clsx from 'clsx';

import shared_styles from './Node.module.scss';
import styles from './PipelineNode.module.scss';

interface NodeData {
	label: string;
}

const handleStyle = { zIndex: -1, opacity: 0 };

const PipelineNode = ({ data, selected }: NodeProps<NodeData>) => {
	return (
		<>
			<Handle
				type="target"
				position={Position.Left}
				id="in"
				style={handleStyle}
			/>
			<Handle
				type="target"
				position={Position.Top}
				id="in:top"
				style={handleStyle}
			/>
			<Handle
				type="target"
				position={Position.Bottom}
				id="in:bottom"
				style={handleStyle}
			/>
			<div className={clsx(shared_styles.root, styles.root, selected ? shared_styles.selected : undefined)}>
				<div className={clsx(shared_styles.title, styles.title)}>
					{/** Can replace with Dataset Icon we have in the console */}
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g opacity="0.12">
							<path d="M19 14C20.1046 14 21 13.1046 21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14Z" fill="black" />
							<path d="M5 6C6.10457 6 7 5.10457 7 4C7 2.89543 6.10457 2 5 2C3.89543 2 3 2.89543 3 4C3 5.10457 3.89543 6 5 6Z" fill="black" />
							<path d="M19 6C20.1046 6 21 5.10457 21 4C21 2.89543 20.1046 2 19 2C17.8954 2 17 2.89543 17 4C17 5.10457 17.8954 6 19 6Z" fill="black" />
							<path d="M19 22C20.1046 22 21 21.1046 21 20C21 18.8954 20.1046 18 19 18C17.8954 18 17 18.8954 17 20C17 21.1046 17.8954 22 19 22Z" fill="black" />
						</g>
						<path d="M12 4V15.2C12 16.8802 12 17.7202 12.327 18.362C12.6146 18.9265 13.0735 19.3854 13.638 19.673C14.2798 20 15.1198 20 16.8 20H17M17 20C17 21.1046 17.8954 22 19 22C20.1046 22 21 21.1046 21 20C21 18.8954 20.1046 18 19 18C17.8954 18 17 18.8954 17 20ZM7 4L17 4M7 4C7 5.10457 6.10457 6 5 6C3.89543 6 3 5.10457 3 4C3 2.89543 3.89543 2 5 2C6.10457 2 7 2.89543 7 4ZM17 4C17 5.10457 17.8954 6 19 6C20.1046 6 21 5.10457 21 4C21 2.89543 20.1046 2 19 2C17.8954 2 17 2.89543 17 4ZM12 12H17M17 12C17 13.1046 17.8954 14 19 14C20.1046 14 21 13.1046 21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
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

export default PipelineNode;