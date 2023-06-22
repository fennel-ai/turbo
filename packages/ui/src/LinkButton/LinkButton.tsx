import { HTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './LinkButton.module.scss';

import InternalLinkIcon from '../../icons/arrow-narrow-up-right.svg';

interface Props extends HTMLAttributes<HTMLButtonElement> {
	icon: JSX.Element | null;
	size?: 'large' | 'small';
}

const DEFAULT_ICON = <InternalLinkIcon />

export const LinkButton = (props: PropsWithChildren<Props>) => {
	const { className, children, color = "neutral", icon = DEFAULT_ICON,  onClick, size = 'small', style } = props;

	return (
		<button className={clsx(styles.root, styles[color], styles[size], className)} onClick={onClick} style={style}>
			{children}
			{icon}
		</button>
	);
};