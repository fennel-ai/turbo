import clsx from 'clsx';
import { PropsWithChildren, StyleHTMLAttributes } from 'react';
import styles from './TitleBlock.module.scss';

type Props = {
	actions?: JSX.Element[];
	align?: 'left' | 'center';
	className?: string;
	style?: StyleHTMLAttributes<HTMLDivElement>;
}

export const TitleBlock = (props: PropsWithChildren<Props>) => {
	const { actions, align, children, className, style } = props;

	return (
		<div className={clsx(styles.root, styles[align])}>
			<div className={clsx(styles.content, styles[align], className)} style={style}>
				{children}
			</div>
			{
				actions?.length ? (
					<div className={clsx(styles.actions, styles[align])}>
						{actions}
					</div>
				) : null
			}
		</div>
	);
};

