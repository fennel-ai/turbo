import { TitleBlock } from "ui";
import { Space } from 'ddd';
import { Canvas, RootState } from '@react-three/fiber';
import styles from './Hero.module.scss';

import { Container } from 'components/Container';

const onCreated = ({ size, camera }: RootState) => {
	if (size.width < 600) {
		camera.position.z = 45;
	}
}

const Hero = () => {
	return (
		<div data-section className={styles.root}>
			<div className={styles.stars}>
				<Canvas onCreated={onCreated}>
					<Space />
				</Canvas>
			</div>
			<Container className={styles.wrapper}>
				<div className={styles.content}>
					<TitleBlock 
						center
					>
						<h1>Experience the Fastest ML Workflow</h1>
						<div className={styles.intro_text}>
							<p>The team is excited to show you just how much Fennel is capable of; Submit a request today and we&apos;ll be in touch soon.</p>
						</div>
					</TitleBlock>
				</div>
			</Container>
		</div>
	);
};

export default Hero;
