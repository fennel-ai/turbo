import { motion } from 'framer-motion';
import styles from './Diagram.module.scss';

const VARIANTS = {
	"0": {
		opacity: 0,
	},
	"1": {
		opacity: 1,
	},
	"2": {
		opacity: 0,
	},
	"3": {
		opacity: 0,
	}
};

const PipelineEdges = () => {
	return (
		<g>
			<motion.path className={styles.animated_edge} variants={VARIANTS} d="M270.5 355.15L284.163 355.15C288.581 355.15 292.163 351.568 292.163 347.149L292.162 331.001C292.162 326.583 295.744 323.001 300.162 323.001L309.5 323.001" stroke="#A5A5B6" strokeDasharray="2 2" />
			<motion.path variants={VARIANTS} stroke="url(#pipelines-pulse-2)" d="M270.5 355.15L284.163 355.15C288.581 355.15 292.163 351.568 292.163 347.149L292.162 331.001C292.162 326.583 295.744 323.001 300.162 323.001L309.5 323.001" strokeWidth={2} />
			<motion.path className={styles.animated_edge} variants={VARIANTS} d="M270.5 226.4L284.161 226.4C288.579 226.4 292.161 229.982 292.161 234.4L292.161 314.998C292.161 319.416 295.743 322.998 300.161 322.998L309.5 322.998" stroke="#A5A5B6" strokeDasharray="2 2" />
			<motion.path variants={VARIANTS} stroke="url(#pipelines-pulse-2)" d="M270.5 226.4L284.161 226.4C288.579 226.4 292.161 229.982 292.161 234.4L292.161 314.998C292.161 319.416 295.743 322.998 300.161 322.998L309.5 322.998" strokeWidth={2} />
			<motion.path className={styles.animated_edge} variants={VARIANTS} d="M270.5 226.4L284.202 226.4C288.621 226.4 292.202 222.818 292.202 218.4L292.203 137.8C292.203 133.382 295.785 129.8 300.203 129.8L309.5 129.8" stroke="#A5A5B6" strokeDasharray="2 2" />
			<motion.path variants={VARIANTS} stroke="url(#pipelines-pulse-1)" d="M270.5 226.4L284.202 226.4C288.621 226.4 292.202 222.818 292.202 218.4L292.203 137.8C292.203 133.382 295.785 129.8 300.203 129.8L309.5 129.8" strokeWidth={2} />
			<motion.path className={styles.animated_edge} variants={VARIANTS} d="M270.5 97.5998L284.132 97.5999C288.55 97.6 292.132 101.182 292.132 105.6L292.132 121.8C292.132 126.218 295.714 129.8 300.132 129.8L309.5 129.8" stroke="#A5A5B6" strokeDasharray="2 2" />
			<motion.path variants={VARIANTS} stroke="url(#pipelines-pulse-1)" d="M270.5 97.5998L284.132 97.5999C288.55 97.6 292.132 101.182 292.132 105.6L292.132 121.8C292.132 126.218 295.714 129.8 300.132 129.8L309.5 129.8" strokeWidth={2} />
		</g>
	);
}

export default PipelineEdges;