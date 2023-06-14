import { MouseEventHandler } from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';

type Props = {
	ariaLabel?: string;
	className?: string;
	color?: 'primary' | 'primary-alt' | 'neutral';
	onClick?: MouseEventHandler<HTMLButtonElement>;
	label: string;
	type?: 'button' | 'submit';
};

export const Button = ({
	ariaLabel,
	className,
	color = 'neutral',
	label,
	onClick,
	type = 'button'
}: Props) => {
	return (
		<button className={clsx(styles.root, styles[color], className)} aria-label={ariaLabel} color={color} onClick={onClick} type={type}>
			{label}
		</button>
	);
};