import { HTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './LinkButton.module.scss';

import InternalLinkIcon from '../../icons/arrow-narrow-up-right.svg';

export const LinkButton = (props: PropsWithChildren<HTMLAttributes<HTMLButtonElement>>) => {
	const { className, children, style } = props;

	return (
		<button className={clsx(styles.root, className, styles.dark)} style={style}>
			{children}
			<InternalLinkIcon />
		</button>
	);
};