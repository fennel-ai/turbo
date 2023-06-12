import Link from 'next/link';
import { IconButton } from 'ui';

import Logo from 'ui/icons/logo.svg';
import MenuIcon from 'ui/icons/menu.svg';
import styles from './Header.module.scss';

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
					<Link href="https://fennel.ai/blog">
						<button className={styles.nav_button}>
							Blog
						</button>
					</Link>
					<Link href="https://docs.fennel.ai">
						<button className={styles.nav_button}>
							Documentation
						</button>
					</Link>
				</div>
				<IconButton className={styles.menu_button} icon={MenuIcon} />
			</nav>
			<div className={styles.border}>
				<div />
			</div>
		</header>
	);
};