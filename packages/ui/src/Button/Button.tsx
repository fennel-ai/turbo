import { MouseEventHandler } from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';

type Props = {
	ariaLabel?: string;
	className?: string;
	color?: 'primary' | 'primary-alt' | 'neutral';
	onClick?: MouseEventHandler<HTMLButtonElement>;
	label: string;
	variant?: 'rounded' | 'pill';
	type?: 'button' | 'submit';
};

export const Button = ({
	ariaLabel,
	className,
	color = 'neutral',
	label,
	onClick,
	variant = 'rounded',
	type = 'button'
}: Props) => {
	return (
		<button className={clsx(styles.root, styles[color], className)} aria-label={ariaLabel} color={color} onClick={onClick} variant={variant} type={type}>
			{label}
		</button>
	);
};