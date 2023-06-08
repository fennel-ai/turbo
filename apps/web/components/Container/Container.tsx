import { HTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './Container.module.scss';

export const Container = ({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
	return <div {...props} className={clsx(styles.root, className)}>{children}</div>
}