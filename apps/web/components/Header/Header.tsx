import Logo from 'ui/icons/logo.svg';
import styles from './Header.module.scss';

export const Header = () => {
	return (
		<header data-header className={styles.root}>
			<div className={styles.backdrop} />
			<nav>
				<div className={styles.brand}>
					<Logo />
					<h2>Fennel</h2>
				</div>
			</nav>
			<div className={styles.border}>
				<div />
			</div>
		</header>
	);
};