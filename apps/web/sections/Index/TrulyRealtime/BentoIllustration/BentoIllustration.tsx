import styled from '@emotion/styled';
import { Card, TitleBlock } from 'ui';

const Root = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: 280px 192px;
	gap: 2rem;
`;

const StreamingJoins = styled(Card)`
	grid-column: span 2;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 1rem;
`;

const FeatureFreshness = styled(Card)`
	grid-column: span 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 1rem;
`;

const LowLatency = styled(Card)`
	grid-column: span 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 1rem;
`;

const BentoIllustration = () => {
	return (
		<Root>
			<StreamingJoins>
				<TitleBlock align="center">
					<h6>Realtime Data Operators</h6>
					<h3>Streaming Joins</h3>
				</TitleBlock>
			</StreamingJoins>
			<FeatureFreshness>
				<TitleBlock align="center">
					<h6>No more stale data</h6>
					<h3>Sub-second Feature Freshness</h3>
				</TitleBlock>
			</FeatureFreshness>
			<LowLatency>
				<TitleBlock align="center">
					<h6>Single-digit ms response</h6>
					<h3>Ultra-low Latency Serving</h3>
				</TitleBlock>
			</LowLatency>
		</Root>
	);
};

export default BentoIllustration;