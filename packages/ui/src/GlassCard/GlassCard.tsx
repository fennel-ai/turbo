import { PropsWithChildren, useEffect, forwardRef, useRef, HTMLAttributes } from "react";
import { useSharedRef } from "../../hooks";
import clsx from 'clsx';
import styles from './GlassCard.module.scss';

import { Card } from '../Card';

export const GlassCard = forwardRef(({
	children,
	className,
	style,
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>, ref) => {
	const el = useRef<HTMLDivElement>(null);
	const sharedRef = useSharedRef(null, [el, ref]);

	useEffect(() => {
		if (el.current) {
			const box = el.current.getBoundingClientRect();
			el.current.style.setProperty('--pos-x', `${box.left}`);
			el.current.style.setProperty('--pos-y', `${box.top}`);

		}
	}, [])

	return (
		<Card ref={sharedRef} className={clsx(styles.root, className)} style={style}>
			<div className={styles.content}>
				{children}
			</div>
		</Card>
	);
});

GlassCard.displayName = 'GlassCard';