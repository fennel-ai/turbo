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
						<h1>Realtime Feature Platform. Beautifully Built.</h1>
						<div className={styles.intro_text}>
							<p>Fennel helps you author, compute, store, serve, monitor & govern both realtime and batch ML features.</p>
						</div>
					</TitleBlock>
				</div>
			</Container>
		</div>
	);
};

export default Hero;
