import clsx from 'clsx';
import Logo from 'ui/icons/logo.svg';
import styles from './Footer.module.scss';

import { Container } from 'components/Container';

export const Footer = () => {
	return (
		<footer className={styles.root}>
			<Container className={styles.wrapper}>
				<div className={styles.brand}>
					<Logo />
					<h3>Fennel</h3>
				</div>
			</Container>
			<Container className={clsx(styles.wrapper, styles.credit)}>
				<p>© 2023 Fennel · All Rights Reserved</p>
			</Container>
		</footer>
	);
};