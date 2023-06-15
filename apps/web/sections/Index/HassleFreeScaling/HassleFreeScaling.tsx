import { IconPuck, LinkButton, TitleBlock } from 'ui';
import ChartBreakoutIcon from 'ui/icons/chart-breakout-circle.svg';
import ShieldIcon from 'ui/icons/shield-03.svg';
import PiggyBankIcon from 'ui/icons/piggy-bank-01.svg';

import styles from './HassleFreeScaling.module.scss';

import { Container } from 'components/Container';

const HassleFreeScaling = () => {
	return (
		<div className={styles.root} data-section>
			<div className={styles.background} />
			<Container className={styles.container}>
				<TitleBlock align="center">
					<h6>Enterprise-Grade Performance</h6>
					<h2>Hassle-free Scaling</h2>
				</TitleBlock>
				<div className={styles.grid}>
					<div className={styles.cell}>
						<IconPuck>
							<ChartBreakoutIcon />
						</IconPuck>
						<div className={styles.text_group}>
							<h3>Scalability & Reliability</h3>
							<p>Scale to billions of feature queries without lifting a finger.</p>
						</div>
						<LinkButton>Learn More</LinkButton>
					</div>
					<div className={styles.cell}>
						<IconPuck>
							<ShieldIcon />
						</IconPuck>
						<div className={styles.text_group}>
							<h3>Enterprise-grade Security</h3>
							<p>SOC2-compliant deployment inside your VPC.</p>
						</div>
						<LinkButton>Learn More</LinkButton>
					</div>
					<div className={styles.cell}>
						<IconPuck>
							<PiggyBankIcon />
						</IconPuck>
						<div className={styles.text_group}>
							<h3>Cloud Cost Efficiency</h3>
							<p>Lower cloud cost for the same workload & performance.</p>
						</div>
						<LinkButton>Learn More</LinkButton>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default HassleFreeScaling;