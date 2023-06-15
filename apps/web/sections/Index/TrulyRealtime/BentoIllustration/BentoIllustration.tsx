import styled from '@emotion/styled';
import { media } from 'styles/utils';
import { Card, TitleBlock } from 'ui';

import { LowLatency } from './LowLatency';
import { Freshness } from './Freshness';
import { Canvas } from '@react-three/fiber';
import { Helix } from 'ddd';

const Root = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: 280px 192px 192px;
	gap: 1rem;

	${media('sm')} {
		gap: 2rem;
		grid-template-rows: 280px 192px;
	}
`;

const StreamingJoins = styled(Card)`
	grid-column: span 2;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 1rem;
	position: relative;
`;

const BentoIllustration = () => {
	return (
		<Root>
			<StreamingJoins>
				<Canvas style={{position: 'absolute', inset: 0, zIndex: -1}}>
					<Helix />
				</Canvas>
				<TitleBlock align="center">
					<h6>Unprecedented Power</h6>
					<h3>Temporally correct streaming joins</h3>
				</TitleBlock>
			</StreamingJoins>
			<Freshness />
			<LowLatency />
		</Root>
	);
};

export default BentoIllustration;