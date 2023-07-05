import { motion } from 'framer-motion';
import styles from './Diagram.module.scss';

const VARIANTS = {
	"0": {
		opacity: 1,
	},
	"1": {
		opacity: 0
	},
	"2": {
		opacity: 0
	},
	"3": {
		opacity: 0
	},
}

const SourceConnectors = () => {
	return (
		<motion.g variants={VARIANTS}>
			<path className="animated_edge" d="M137 355.2L185.5 355.2" stroke="#A5A5B6" stroke-dasharray="2 2" />
			<path stroke="url(#sources-pulse)" d="M137 355.2L185.5 355.2" strokeWidth={2} />
			<path className="animated_edge" d="M137 226.4L185.5 226.4" stroke="#A5A5B6" stroke-dasharray="2 2" />
			<path stroke="url(#sources-pulse)" d="M137 226.4L185.5 226.4" strokeWidth={2} />
			<path className="animated_edge" d="M137.002 97.6L162.744 97.6001C162.744 97.6001 162.744 97.6001 162.744 97.6001C162.745 97.6001 168.26 97.6 185.5 97.6001" stroke="#A5A5B6" stroke-dasharray="2 2" />
			<path stroke="url(#sources-pulse)" d="M137.002 97.6L162.744 97.6001C162.744 97.6001 162.744 97.6001 162.744 97.6001C162.745 97.6001 168.26 97.6 185.5 97.6001" strokeWidth={2} />
		</motion.g>
	);
};

export default SourceConnectors;