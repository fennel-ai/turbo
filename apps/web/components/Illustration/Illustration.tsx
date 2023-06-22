import { HTMLAttributes, PropsWithChildren } from 'react';
import clsx from "clsx";
import { Card } from 'ui';
import styles from './Illustration.module.scss';


export const Illustration = ({ className, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => <Card {...props} className={clsx(styles.root, className)} />