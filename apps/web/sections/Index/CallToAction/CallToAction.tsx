import { Canvas, RootState } from '@react-three/fiber';
import { Button, TitleBlock } from "ui";
import styles from './CallToAction.module.scss';
import {Space} from 'ddd';
import { Container } from 'components/Container';
import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const onCreated = ({ size, camera }: RootState) => {
	if (size.width < 600) {
		camera.position.z = 45;
	}
}

const VARIANTS = {
	"skewed": {
		rotateX: -35,
		y: 24,
		scale: 0.9
	},
	"normal": {
		rotateX: 0,
		y: 0,
		scale: 1
	}
}

const TRANSITION = {
	type: 'spring',
	friction: 20,
	damping: 10,
	stiffness: 100,
	delay: 0.25
}

const CallToAction = () => {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref);

	return (
		<div className={styles.root} data-section data-theme="dark">
			<div className={styles.stars}>
				<Canvas onCreated={onCreated}>
					<Space />
				</Canvas>
				{/* <div className={styles.star} />
				<div className={styles.star} />
				<div className={styles.star} />
				<div className={styles.star} />
				<div className={styles.star} />
				<div className={styles.star} />
				<div className={styles.star} />
				<div className={styles.star} />
				<div className={styles.star} />
				<div className={styles.star} />
				<div className={styles.star} />
				<div className={styles.star} /> */}
			</div>
			<Image className={styles.blur_l} src="/images/cta_blur_b.png" aria-hidden alt="gradient blur" width={1076} height={1076} />
			<Image className={styles.blur_r} src="/images/cta_blur_p.png" aria-hidden alt="gradient blur" width={1171} height={1171} />
			<Container className={styles.wrapper}>
				<div className={styles.title_wrapper}>
					<TitleBlock
						align="center"
					>
						<h2>Experience the fastest ML workflow</h2>
					</TitleBlock>
					<Button color="primary" label="Request a Demo" />
				</div>
				<motion.div transition={TRANSITION} variants={VARIANTS} animate={inView ? 'normal' : 'skewed'} ref={ref} className={styles.console_img}>
					<Image src="/images/dataset-detail.webp" alt="Console: Dataset Detail" width={2016} height={2954} />
				</motion.div>
			</Container>
		</div>
	);
};

export default CallToAction;