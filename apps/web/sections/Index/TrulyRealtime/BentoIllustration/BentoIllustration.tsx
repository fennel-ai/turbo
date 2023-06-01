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
`;

const FeatureFreshness = styled(Card)`
	grid-column: span 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const LowLatency = styled(Card)`
	grid-column: span 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const BentoIllustration = () => {
	return (
		<Root>
			<StreamingJoins>
				<TitleBlock 
					size="small"
					subtitle="Realtime Data Operators"
					title="Streaming Joins"
				/>
			</StreamingJoins>
			<FeatureFreshness>
				<TitleBlock
					size="small"
					subtitle="No more stale data"
					title="Sub-Second Feature Freshness"
				/>
			</FeatureFreshness>
			<LowLatency>
				<TitleBlock
					size="small"
					subtitle="Single-digit ms response"
					title="Ultra-low Latency Serving"
				/>
			</LowLatency>
		</Root>
	);
};

export default BentoIllustration;