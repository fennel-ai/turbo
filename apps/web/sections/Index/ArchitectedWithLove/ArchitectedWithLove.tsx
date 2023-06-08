import { LinkButton, TitleBlock } from 'ui';
import clsx from 'clsx';
import chunk from 'lodash/chunk';
import styles from './ArchitectedWithLove.module.scss';

import { useMatchMedia } from 'ui/hooks';

import { Container } from 'components/Container';

import GrpcLogo from 'ui/icons/technologies/grpc.svg';
import KafkaLogo from 'ui/icons/technologies/kafka.svg';
import KubernetesLogo from 'ui/icons/technologies/kubernetes.svg';
import PandasLogo from 'ui/icons/technologies/pandas.svg';
import RocksdbLogo from 'ui/icons/technologies/rocksdb.svg';
import RustLogo from 'ui/icons/technologies/rust.svg';
import PostgresLogo from 'ui/icons/technologies/postgresql.svg';
import PulumiLogo from 'ui/icons/technologies/pulumi.svg';

const TECH = [
	{
		logo: RustLogo,
		name: "Rust",
		text: "The primary language of our backend, relying heavily on Tokio's async runtime"
	},
	{
		logo: KafkaLogo,
		name: "Kafka",
		text: "Handles all inflow data. All streaming jobs read and write to Kafka."
	},
	{
		logo: RocksdbLogo,
		name: "RocksDB",
		text: "Handles all at-rest data, with some also offloaded to Redis."
	},
	{
		logo: PandasLogo,
		name: "Pandas",
		text: "Used as the dataframe interface between user-written code and the server."
	},
	{
		logo: GrpcLogo,
		name: "gRPC",
		text: "Used alongside Protobufs to write services and exchange data."
	},
	{
		logo: KubernetesLogo,
		name: "Kubernetes",
		text: "For maintaining the lifecycle of all running services."
	},
	{
		logo: PulumiLogo,
		name: "Pulumi",
		text: "Used for provisioning Fennel infrastructure as code."
	},
	{
		logo: PostgresLogo,
		name: "PostgreSQL",
		text: "Used as a central metadata store, with the exception of customer data."
	},
]

const ArchitectedWithLove = () => {
	const useThreeColumns = useMatchMedia('(min-width: 34rem)');

	const MARQUEES = chunk(TECH, useThreeColumns ? 3 : 4);
	console.log(MARQUEES);

	return (
		<div className={styles.root}>
			<Container className={styles.wrapper}>
				<div className={styles.content}>
					<TitleBlock align="left" actions={[<LinkButton>Explore the Architecture</LinkButton>]}>
						<h6>Craftsman-like passion for Developer Experience</h6>
						<h2>Architected with Love</h2>
					</TitleBlock>
				</div>
				<div className={styles.marquee_wrapper}>
					{
						MARQUEES.map((technologies, i) => (
							<div className={clsx(styles.marquee, i % 2 ? undefined : styles.reverse)}>
								<section key={i}>
									{
										technologies.map(({ logo: Logo, name, text }, index) => (
											<div key={name} className={styles.technology}>
												<Logo />
												<div>
													<h6>{name}</h6>
													<p>{text}</p>
												</div>
											</div>
										))
									}
								</section>
								<section aria-hidden="true">
									{
										technologies.map(({ logo: Logo, name, text }, index) => (
											<div key={name} className={styles.technology}>
												<Logo />
												<div>
													<h6>{name}</h6>
													<p>{text}</p>
												</div>
											</div>
										))
									}
								</section>
							</div>
						))
					}
				</div>
			</Container>
		</div>
	);
};

export default ArchitectedWithLove;