import styled from '@emotion/styled';
import { LinkButton, Ticker, TitleBlock } from 'ui';

import GrpcLogo from 'ui/icons/technologies/grpc.svg';
import KafkaLogo from 'ui/icons/technologies/kafka.svg';
import KubernetesLogo from 'ui/icons/technologies/kubernetes.svg';
import PandasLogo from 'ui/icons/technologies/pandas.svg';
import RocksdbLogo from 'ui/icons/technologies/rocksdb.svg';
import RustLogo from 'ui/icons/technologies/rust.svg';
import PostgresLogo from 'ui/icons/technologies/postgresql.svg';
import PulumiLogo from 'ui/icons/technologies/pulumi.svg';

import { Container } from 'components/Container';

const Root = styled.div`
	padding: 5rem 0;
	display: flex;
	flex-direction: column;
	gap: 3rem;
	align-items: center;
`;

const Wrapper = styled(Container)`
	display: flex;
	flex-direction: column;
	gap: 4rem;
`;

const Item = styled.div`
	width: 23.5rem;
	height: 20rem;
	padding: 2rem;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
	flex: 1 1 auto;

	svg {
		width: auto;
		height: 6rem;
	}

	p {
		font-size: 1rem;
		line-height: 1.5rem;
		font-variation-settings: "wght" 500;
		& b {
			font-variation-settings: "wght" 800;
		}
	}
`;

const ArchitectedWithLove = () => {
	return (
		<Root>
			<Wrapper>
				<TitleBlock align="center">
					<h6>Craftsman-like passion for Developer Experience</h6>
					<h2>Architected with Love</h2>
				</TitleBlock>
			</Wrapper>
			<Ticker isPlaying>
				<Item>
					<RustLogo />
					<p>
						<b>Rust</b> is the language of choice for our backend, relying heavily on Tokio's async runtime.
					</p>
				</Item>
				<Item>
					<KafkaLogo />
					<p>
						<b>Kafka</b> handles all in-flow data. All streaming jobs are read from, and write to, Kafka.
					</p>
				</Item>
				<Item>
					<RocksdbLogo />
					<p>
						<b>RocksDB</b> for all at-rest data data storage, with small parts also offloaded to Redis.
					</p>
				</Item>
				<Item>
					<PostgresLogo />
					<p>
						<b>PostgreSQL</b> as a central metadata store, with the exception of customer data.
					</p>
				</Item>
				<Item>
					<PulumiLogo />
					<p>
						<b>Pulumi</b> for provisioning infrastructure with code.
					</p>
				</Item>
				<Item>
					<KubernetesLogo />
					<p>
						<b>Kubernetes</b> for maintaining the lifecycle of all running services.
					</p>
				</Item>
				<Item>
					<PandasLogo />
					<p>
						<b>Pandas</b> is used as the dataframe interface between user-written python code and the server.
					</p>
				</Item>
				<Item>
					<GrpcLogo />
					<p>
						<b>GRPC</b> and protocol buffers to write services and the exchange of data.
					</p>
				</Item>
			</Ticker>
			<LinkButton>Explore the Architecture</LinkButton>
		</Root>
	);
};

export default ArchitectedWithLove;