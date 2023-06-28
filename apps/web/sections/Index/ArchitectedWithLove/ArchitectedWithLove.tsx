import { ReactNode, useMemo } from 'react';
import { Container, PillButton, TitleBlock } from 'ui';
import { media } from 'styles/utils';
import styled from "@emotion/styled";
import { keyframes } from '@emotion/react';
import Link from 'next/link';
import chunk from 'lodash/chunk';

import { useMatchMedia } from 'hooks';

import GrpcLogo from 'ui/icons/technologies/grpc.svg';
import KafkaLogo from 'ui/icons/technologies/kafka.svg';
import KubernetesLogo from 'ui/icons/technologies/kubernetes.svg';
import PandasLogo from 'ui/icons/technologies/pandas.svg';
import RocksdbLogo from 'ui/icons/technologies/rocksdb.svg';
import RustLogo from 'ui/icons/technologies/rust.svg';
import PostgresLogo from 'ui/icons/technologies/postgresql.svg';
import PulumiLogo from 'ui/icons/technologies/pulumi.svg';

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

const Root = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 3rem;
	background-color: ${({ theme }) => theme.surface};
`;

const Wrapper = styled(Container)`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	row-gap: 2rem;
`;

const Content = styled.div`
	padding: 5rem 0;
	grid-column: span 12;
	display: flex;
	align-items: center;

	h6, h2 {
		color: colors.get(purple, 90) !important;
	}

	${media('sm', 'max')} {
		justify-content: center;
		padding-bottom: 0;
	}

	${media('sm')} {
		grid-column: 2 / span 4;
	}
`;

const MarqueeWrapper = styled.div`
	max-height: 28rem;
	grid-column: span 12;
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	grid-template-rows: 1fr;
	column-gap: 1rem;

	
	${media('sm')} {
		grid-column: 7 / span 6;
	}
`;

const marquee_scroll = keyframes`
	0% {
		transform: translateY(0%);
	}

	100% {
		transform: translateY(calc(-100% - 1rem));
	}
`;

const Marquee = styled.div`
	grid-column: span 3;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	user-select: none;
	gap: 1rem;
	mask-image: linear-gradient(to bottom,
				hsl(0 0% 0% / 0),
				hsl(0 0% 0% / 1) 30%,
				hsl(0 0% 0% / 1) 70%,
				hsl(0 0% 0% / 0));

	@media (min-width: 34rem) {
		grid-column: span 2;
	}

	& > section {
		flex-shrink: 0;
		align-items: center;
		justify-content: space-around;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		animation: ${marquee_scroll} 60s linear infinite;
	}

	&.reverse {
		& > section {
			animation-direction: reverse;
			animation-delay: -3;
		}
	}
`;

const Technology = styled.div`
	border-radius: 1rem;
	padding: 1rem;
	border: 1px solid ${({ theme }) => theme.border};
	align-self: stretch;
	height: 172px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	color: ${({ theme }) => theme.on_alt};
	
	& > div {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		align-items: stretch;

		& > h6 {
			margin: 0;
			color: ${({ theme }) => theme.on};
			font-size: 0.875rem;
			line-height: 1rem;
			font-variation-settings: "wght" 700;
		}
	
		& > p {
			margin: 0;
			opacity: 0.8;
			font-size: 0.75rem;
			line-height: 1rem;
			font-variation-settings: "wght" 500;
		}
	}
`;

const renderTechnology = ({ logo, name, text }: TechnologyDefinition) => (
	<Technology key={name}>
		{logo}
		<div>
			<h6>{name}</h6>
			<p>{text}</p>
		</div>
	</Technology>
);

const ArchitectedWithLove = () => {
	const useThreeColumns = useMatchMedia('(min-width: 34rem)');
	const MARQUEES = useMemo(() => chunk(TECH, useThreeColumns ? 3 : 4), [useThreeColumns]);

	return (
		<Root data-section data-theme="dark">
			<Wrapper>
				<Content>
					<TitleBlock actions={[<Link href="https://fennel.ai/docs/architecture/technologies/"><PillButton color="invert">Explore the Architecture</PillButton></Link>]}>
						<h6>Craftsman-like passion for Developer Experience</h6>
						<h2>Architected with Love</h2>
					</TitleBlock>
				</Content>
				<MarqueeWrapper>
					{
						MARQUEES.map((technologies, i) => (
							<Marquee key={i} className={i % 2 ? undefined : 'reverse'}>
								<section>
									{technologies.map(renderTechnology)}
								</section>
								<section aria-hidden="true">
									{technologies.map(renderTechnology)}
								</section>
							</Marquee>
						))
					}
				</MarqueeWrapper>
			</Wrapper>
		</Root>
	);
};

export default ArchitectedWithLove;