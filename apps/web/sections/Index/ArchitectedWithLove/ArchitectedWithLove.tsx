import styled from '@emotion/styled';
import { LinkButton, Ticker, TitleBlock } from 'ui';

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
	width: 376px;
	height: 352px;
	padding: 2rem;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
	flex: 1 1 auto;

	.dummy-icon {
		width: 6rem;
		height: 6rem;
		border-radius: 50%;
		background-color: rgba(0, 0, 0, 0.24);
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
					<div className="dummy-icon" />
					<p>
						<b>Rust</b> is the language of choice for our backend, relying heavily on Tokio's async runtime.
					</p>
				</Item>
				<Item>
					<div className="dummy-icon" />
					<p>
						<b>Kafka</b> handles all in-flow data. All streaming jobs are read from, and write to, Kafka.
					</p>
				</Item>
				<Item>
					<div className="dummy-icon" />
					<p>
						<b>RocksDB</b> for all at-rest data data storage, with small parts also offloaded to Redis.
					</p>
				</Item>
				<Item>
					<div className="dummy-icon" />
					<p>
						<b>PostgreSQL</b> as a central metadata store, with the exception of customer data.
					</p>
				</Item>
			</Ticker>
			<LinkButton>Explore the Architecture</LinkButton>
		</Root>
	);
};

export default ArchitectedWithLove;