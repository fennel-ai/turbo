import { PropsWithChildren, ReactElement, StyleHTMLAttributes } from 'react';
import { media } from 'styles/utils';
import styled from '@emotion/styled';

import { Container } from '../Container';
import clsx from 'clsx';
import styles from './SplitSection.module.scss';

type Props = {
	className?: string;
	direction?: 'forward' | 'reverse';
	illustration: ReactElement;
	style?: StyleHTMLAttributes<HTMLDivElement>;
}

export const  SplitSection = ({ className, children, direction = "forward", illustration, style }: PropsWithChildren<Props>) => {
	return (
		<div data-section className={clsx(styles.root, className)} style={style}>
			<Container className={styles.wrapper}>
				<div className={clsx(styles.illustration, styles[direction])}>
					{illustration}
				</div>
				<div className={clsx(styles.content, styles[direction])}>
					{children}
				</div>
			</Container>
		</div>
	)
};