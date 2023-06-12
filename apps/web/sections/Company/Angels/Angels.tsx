import { TitleBlock } from 'ui';
import styles from './Angels.module.scss';

import { Container } from "components/Container";

const Angels = () => {
	return (
		<div data-section className={styles.root}>
			<Container className={styles.container}>
				<div className={styles.content}>
					<TitleBlock
						align="center"
					>
						<h1>Angels</h1>
					</TitleBlock>
				</div>
			</Container>
		</div>
	);
};

export default Angels;
