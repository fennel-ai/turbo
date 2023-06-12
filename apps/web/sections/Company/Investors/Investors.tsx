import { TitleBlock } from 'ui';
import styles from './Investors.module.scss';

import { Container } from "components/Container";

const Investors = () => {
	return (
		<div data-section className={styles.root}>
			<Container className={styles.container}>
				<div className={styles.content}>
					<TitleBlock
						align="center"
					>
						<h1>Backed by top VCs</h1>
					</TitleBlock>
				</div>
			</Container>
		</div>
	);
};

export default Investors;
