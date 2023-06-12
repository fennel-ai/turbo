import Image from 'next/image';
import styles from './TeamMember.module.scss';

import { GlassCard } from 'ui';

type Props = {
	name: string;
	role: string;
	src: string;
};

export const TeamMember = ({ name, role, src }: Props) => {
	return (
		<GlassCard className={styles.root}>
			<Image className={styles.image} src={src} alt={`Headshot of ${name}`} width={320} height={256} />
			<div className={styles.text}>
				<h3>{name}</h3>
				<p>{role}</p>
			</div>
		</GlassCard>
	);
};