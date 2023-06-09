import Logo from 'ui/icons/logo.svg';
import styles from './Header.module.scss';
import Link from 'next/link';

export const Header = () => {
	return (
		<header data-header className={styles.root}>
			<div className={styles.backdrop} />
			<nav>
				<Link href="/">
					<div className={styles.brand}>
						<Logo />
						<h2>Fennel</h2>
					</div>
				</Link>
				<div className={styles.menu}>
					<Link href="/company">
						<button className={styles.nav_button}>
							Company
						</button>
					</Link>
					<button className={styles.nav_button}>
						Blog
					</button>
					<button className={styles.nav_button}>
						Documentation
					</button>
				</div>
			</nav>
			<div className={styles.border}>
				<div />
			</div>
		</header>
	);
};