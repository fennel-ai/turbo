import { ComponentType, MouseEventHandler } from 'react';
import clsx from 'clsx';
import styles from './IconButton.module.scss';

type Props = {
	ariaLabel?: string;
	className?: string,
	icon: ComponentType,
	onClick?: MouseEventHandler<HTMLButtonElement>,
}

export const IconButton = ({ ariaLabel, className, icon: Icon, onClick }: Props) => {
	return (
		<button aria-label={ariaLabel} className={clsx(styles.root, className)} onClick={onClick}>
			<Icon />
		</button>
	);
};