import { Button, TitleBlock } from "ui";
import styles from './Hero.module.scss';

import { Container } from 'components/Container';

const Hero = () => {
	return (
		<div data-section className={styles.root}>
			<div className={styles.background} />
			<Container className={styles.wrapper}>
				<div className={styles.content}>
					<TitleBlock 
						align="center"
						actions={[
							<Button label="Read the Documentation" color="primary" />
						]}
					>
						<h1>Realtime Feature Engineering Platform. Beautifully Built.</h1>
						<div className={styles.intro_text}>
							<p>Enterprise-grade ML infrastructure for teams of all sizes. Fennel is a feature engineering platform designed to help you store, serve, discover and scale with ease.</p>
						</div>
					</TitleBlock>
				</div>
			</Container>
		</div>
	);
};

export default Hero;
