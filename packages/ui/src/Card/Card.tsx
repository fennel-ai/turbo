import { ForwardedRef, HTMLAttributes, PropsWithChildren, StyleHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Card.module.scss';

export const Card = forwardRef(({ className, children, style }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>, ref: ForwardedRef<HTMLDivElement>) => {
	return (
		<div className={clsx(styles.root, className)} ref={ref} style={style}>
			{children}
		</div>
	);
});

Card.displayName = 'Card';