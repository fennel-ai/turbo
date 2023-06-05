import { ComponentStory, ComponentMeta } from '@storybook/react';
import styled from '@emotion/styled';
import { Card, Marquee } from 'ui';

import GrpcLogo from 'ui/icons/technologies/grpc.svg';
import KafkaLogo from 'ui/icons/technologies/kafka.svg';
import KubernetesLogo from 'ui/icons/technologies/kubernetes.svg';
import PandasLogo from 'ui/icons/technologies/pandas.svg';
import RocksdbLogo from 'ui/icons/technologies/rocksdb.svg';
import RustLogo from 'ui/icons/technologies/rust.svg';
import PostgresLogo from 'ui/icons/technologies/postgresql.svg';
import PulumiLogo from 'ui/icons/technologies/pulumi.svg';

const TechCard = styled(Card)`
	width: 23.5rem;
	height: 20rem;
	padding: 2rem;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
	flex: 1 1 auto;

	& svg {
		width: 6rem;
		height: 6rem;
	}

	p {
		white-space: wrap;
		font-size: 1rem;
		line-height: 1.5rem;
		font-variation-settings: "wght" 500;
		& b {
			font-variation-settings: "wght" 800;
		}
	}
`;

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Shared/Marquee',
  component: Marquee,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Marquee>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Marquee> = (args) => <Marquee {...args}>
	<TechCard>
		<RustLogo />
		<p>
			<b>Rust</b> is the language of choice for our backend, relying heavily on Tokio's async runtime.
		</p>
	</TechCard>
	<TechCard>
		<KafkaLogo />
		<p>
			<b>Kafka</b> handles all in-flow data. All streaming jobs are read from, and write to, Kafka.
		</p>
	</TechCard>
	<TechCard>
		<RocksdbLogo height="96px" width="116px" />
		<p>
			<b>RocksDB</b> for all at-rest data data storage, with small parts also offloaded to Redis.
		</p>
	</TechCard>
	<TechCard>
		<PostgresLogo />
		<p>
			<b>PostgreSQL</b> as a central metadata store, with the exception of customer data.
		</p>
	</TechCard>
	<TechCard>
		<PulumiLogo />
		<p>
			<b>Pulumi</b> for provisioning infrastructure with code.
		</p>
	</TechCard>
	<TechCard>
		<KubernetesLogo />
		<p>
			<b>Kubernetes</b> for maintaining the lifecycle of all running services.
		</p>
	</TechCard>
	<TechCard>
		<PandasLogo />
		<p>
			<b>Pandas</b> is used as the dataframe interface between user-written python code and the server.
		</p>
	</TechCard>
	<TechCard>
		<GrpcLogo width="223px" height="96px" />
		<p>
			<b>GRPC</b> and protocol buffers to write services and exchange data.
		</p>
	</TechCard>
</Marquee>;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
