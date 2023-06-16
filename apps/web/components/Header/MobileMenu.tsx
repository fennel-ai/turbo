import { createPortal } from "react-dom";
import { useModalPresence } from "hooks";

import styles from './MobileMenu.module.scss';
import Link from "next/link";

export const MobileMenu = () => {
	useModalPresence();

	return createPortal(
		<div className={styles.root}>
			<nav>
				<ul>
					<Link href="/company">
						<li>
							Company
						</li>
					</Link>
					<Link href="/blog">
						<li>
							Blog
						</li>
					</Link>
					<Link href="https://docs.fennel.ai/">
						<li>
							Documentation
						</li>
					</Link>
				</ul>
			</nav>
		</div>,
		document.body,
	);
};