import { TitleBlock } from "ui";
import styles from './Hero.module.scss';

import { Container } from 'components/Container';

const Hero = () => {
	return (
		<div data-section className={styles.root}>
			<Container className={styles.wrapper}>
				<div className={styles.content}>
					<TitleBlock 
						align="center"
					>
						<h1>Thank you for your interest!</h1>
						<div className={styles.intro_text}>
							<p>We&apos;ll get back to you shortly. In the meantime, feel free to directly schedule a meeting with Fennel AI&apos;s CEO, Nikhil Garg.</p>
						</div>
					</TitleBlock>
				</div>
			</Container>
		</div>
	);
};

export default Hero;
