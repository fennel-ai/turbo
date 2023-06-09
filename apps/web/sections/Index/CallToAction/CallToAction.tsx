import { Button, TitleBlock } from "ui";
import styles from './CallToAction.module.scss';

import { Container } from 'components/Container';
import Image from 'next/image';

const CallToAction = () => {
	return (
		<div className={styles.root} data-section data-theme="dark">
			<div className={styles.stars}>
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
				<div className={styles.star} />
				<div className={styles.star} />
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
				<div className={styles.console_img}>
					<Image src="/images/dataset-detail.webp" alt="Console: Dataset Detail" width={2016} height={2954} />
				</div>
			</Container>
		</div>
	);
};

export default CallToAction;