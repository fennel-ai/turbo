import { LinkButton, TitleBlock } from 'ui';
import clsx from 'clsx';
import chunk from 'lodash/chunk';
import styles from './ArchitectedWithLove.module.scss';

import { useMatchMedia } from 'hooks';

import { Container } from 'components/Container';

import GrpcLogo from 'ui/icons/technologies/grpc.svg';
import KafkaLogo from 'ui/icons/technologies/kafka.svg';
import KubernetesLogo from 'ui/icons/technologies/kubernetes.svg';
import PandasLogo from 'ui/icons/technologies/pandas.svg';
import RocksdbLogo from 'ui/icons/technologies/rocksdb.svg';
import RustLogo from 'ui/icons/technologies/rust.svg';
import PostgresLogo from 'ui/icons/technologies/postgresql.svg';
import PulumiLogo from 'ui/icons/technologies/pulumi.svg';
import { ReactNode, useMemo } from 'react';

type TechnologyDefinition = {
	logo: ReactNode,
	name: string,
	text: string,
}

const TECH: TechnologyDefinition[] = [
	{
		logo: <RustLogo width={32} height={32} />,
		name: "Rust",
		text: "The primary language of our backend, relying heavily on Tokio's async runtime"
	},
	{
		logo: <KafkaLogo width={32} height={32} />,
		name: "Kafka",
		text: "Handles all inflow data. All streaming jobs read and write to Kafka."
	},
	{
		logo: <RocksdbLogo height={38} width={32} />,
		name: "RocksDB",
		text: "Handles all at-rest data, with some also offloaded to Redis."
	},
	{
		logo: <PandasLogo width={32} height={32} />,
		name: "Pandas",
		text: "Used as the dataframe interface between user-written code and the server."
	},
	{
		logo: <GrpcLogo width={74} height={32} />,
		name: "gRPC",
		text: "Used alongside Protobufs to write services and exchange data."
	},
	{
		logo: <KubernetesLogo width={32} height={32} />,
		name: "Kubernetes",
		text: "For maintaining the lifecycle of all running services."
	},
	{
		logo: <PulumiLogo width={32} height={32} />,
		name: "Pulumi",
		text: "Used for provisioning Fennel infrastructure as code."
	},
	{
		logo: <PostgresLogo width={32} height={32} />,
		name: "PostgreSQL",
		text: "Used as a central metadata store, with the exception of customer data."
	},
]

const renderTechnology = ({ logo, name, text }: TechnologyDefinition) => (
	<div key={name} className={styles.technology}>
		{logo}
		<div>
			<h6>{name}</h6>
			<p>{text}</p>
		</div>
	</div>
);

const ArchitectedWithLove = () => {
	const useThreeColumns = useMatchMedia('(min-width: 34rem)');

	const MARQUEES = useMemo(() => chunk(TECH, useThreeColumns ? 3 : 4), [useThreeColumns]);

	return (
		<div data-section data-theme="dark" className={styles.root}>
			<Container className={styles.wrapper}>
				<div className={styles.content}>
					<TitleBlock align="left" actions={[<LinkButton color="invert">Explore the Architecture</LinkButton>]}>
						<h6>Craftsman-like passion for Developer Experience</h6>
						<h2>Architected with Love</h2>
					</TitleBlock>
				</div>
				<div className={styles.marquee_wrapper}>
					{
						MARQUEES.map((technologies, i) => (
							<div key={i} className={clsx(styles.marquee, i % 2 ? undefined : styles.reverse)}>
								<section>
									{technologies.map(renderTechnology)}
								</section>
								<section aria-hidden="true">
									{technologies.map(renderTechnology)}
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