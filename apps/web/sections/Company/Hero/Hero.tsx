import { TitleBlock } from "ui";
import styles from './Hero.module.scss';

import { Container } from 'components/Container';

const Hero = () => {
	return (
		<div data-section className={styles.root}>
			<div className={styles.background} />
			<Container className={styles.wrapper}>
				<div className={styles.content}>
					<TitleBlock 
						center
					>
						<h1>Built by the creators of ML Infrastructure at Facebook.</h1>
						<div className={styles.intro_text}>
							<p>Fennel is an ex-Facebook/Google team on a mission to enable companies and teams of any size to harness realtime machine learning to build delightful products for their customers.</p>
						</div>
					</TitleBlock>
				</div>
			</Container>
		</div>
	);
};

export default Hero;
