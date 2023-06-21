import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';
import { IconButton, LinkButton } from 'ui';
import { useRouter } from 'next/router';
import { Masthead } from 'ui';
import styles from './Header.module.scss';

import MenuIcon from 'ui/icons/menu.svg';
import CloseIcon from 'ui/icons/close.svg';
import { MobileMenu } from './MobileMenu';
import RequestDemoModal from 'components/RequestDemoModal/RequestDemoModal';

export const Header = () => {
	const router = useRouter();
	const [showMobileMenu, toggleMobileMenu] = useState(false);
	const [showRequestDemo, toggleRequestDemo] = useState(false);

	useEffect(() => {
		if (showMobileMenu) {
			toggleMobileMenu(false)
		}
		
		if (showRequestDemo) {
			toggleRequestDemo(false)
		}
	}, [router.pathname]);

	return (
		<header data-header className={styles.root}>
			<div className={styles.backdrop} />
			<nav>
				<Link href="/">
					<Masthead className={styles.brand} />
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
				<div className={styles.actions}>
					<LinkButton size="large" color="invert" onClick={() => toggleRequestDemo(prev => !prev)}>
						Request a Demo
					</LinkButton>
					<IconButton 
						className={styles.menu_button}
						icon={showMobileMenu ? CloseIcon : MenuIcon}
						onClick={() => toggleMobileMenu(prev => !prev)}
					/>
				</div>
			</nav>
			<div className={styles.border}>
				<div />
			</div>
			<AnimatePresence>
				{
					showMobileMenu ? <MobileMenu /> : null
				}
			</AnimatePresence>
			<AnimatePresence>
				{
					showRequestDemo ? <RequestDemoModal onClose={() => toggleRequestDemo(false)} /> : null
				}
			</AnimatePresence>
		</header>
	);
};