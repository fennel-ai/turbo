import { PropsWithChildren, ReactElement, StyleHTMLAttributes } from "react";
import styles from './TextBlock.module.scss';

type Props = {
	button?: ReactElement;
	className?: string;
	icon?: ReactElement;
	style?: StyleHTMLAttributes<HTMLDivElement>;
}

export const TextBlock = (props: PropsWithChildren<Props>) => {
	const { button, children, icon } = props;
	return (
		<div className={styles.root}>
			<p className={styles.text}>
				{icon ? icon : null}{children}
			</p>	
			{button}
		</div>
	);
};