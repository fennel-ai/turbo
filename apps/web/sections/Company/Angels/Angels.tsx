import { TitleBlock } from 'ui';
import Image from 'next/image';
import styles from './Angels.module.scss';

import { Container } from "components/Container";
import { TeamMember } from '../TeamMembers/TeamMember';
import clsx from 'clsx';

const Angels = () => {
	return (
		<div data-section className={styles.root}>
			<Container className={styles.container}>
				<div className={styles.content}>
					<TitleBlock
						align="center"
					>
						<h2>Backed by Top VCs & Angels</h2>
					</TitleBlock>
				</div>
			</Container>
			<Container className={clsx(styles.grid, styles.investors)}>
				<div>
					<Image src="/images/foundation.svg" alt="Foundation Capital Logo" width={226} height={72} />
				</div>
				<div>
					<Image src="/images/scribble.svg" alt="Scribble Ventures Logo" width={204} height={72} />
				</div>
				<div>
					<Image src="/images/essence.svg" alt="Essence Logo" width={264} height={48} />
				</div>
			</Container>
			<Container className={styles.grid}>
				<TeamMember src="/images/Person=Neha Narkhede.png" name="Neha Narkhede" role="Co-Founder & Board Member at Confluent · Creator of Kafka" />
				<TeamMember src="/images/Person=Adam D'Angelo.png" name="Adam D'Angelo" role="Founder & CEO, Quora · Ex-CTO Facebook" />
				<TeamMember src="/images/Person=Ajeet Singh.png" name="Ajeet Singh" role="2x Unicorn Founder · Co-Founder & Executive Chairman, ThoughtSpot" />
				<TeamMember src="/images/Person=John Hegeman.png" name="John Hegeman" role="VP Ads & Business Products, Facebook" />
				<TeamMember src="/images/Person=Anantha Kancherala.png" name="Anantha Kancherla" role="AI Platform Engineering, Facebook · ex-VP of Engineering, Lyft" />
				<TeamMember src="/images/Person=Mikhail Parakhin.png" name="Mikhail Parakhin" role="CEO, Advertising & Web Services, Microsoft · Ex-Yandex CTO" />
			</Container>
		</div>
	);
};

export default Angels;
