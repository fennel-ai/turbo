import Image from 'next/image';
import styles from './TeamMember.module.scss';

type Props = {
	additional?: string;
	name: string;
	role: string;
	src: string;
};

export const TeamMember = ({ additional, name, role, src }: Props) => {
	return (
		<div className={styles.root}>
			<div className={styles.wrapper}>
				<Image className={styles.image} src={src} alt={`Headshot of ${name}`} width={298} height={224} />
				<div className={styles.text}>
					<h3>{name}</h3>
					<p>{role}</p>
					{additional ? <p className={styles.additional}>{additional}</p> : null}
				</div>
			</div>
		</div>
	);
};