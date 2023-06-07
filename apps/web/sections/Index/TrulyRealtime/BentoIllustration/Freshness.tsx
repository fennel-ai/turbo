import styled from '@emotion/styled';
import { media } from 'styles/utils';
import { Card, TitleBlock } from 'ui';

import LightningIcon from 'ui/icons/lightning-01.svg';

const Root = styled(Card)`
	position: relative;
	grid-column: span 2;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 1rem;
	overflow: hidden;

	${media('sm')} {
		grid-column: span 1;
	}
`;

const Illustration = styled.div`
	position: absolute;
	z-index: -1;
`;

const MiniLightningL = styled(LightningIcon)`
	position: absolute;
	left: 34px;
	top: 80px;
	transform: rotate(-15deg);
`;

const MiniLightningR = styled(LightningIcon)`
	position: absolute;
	right: 32px;
	top: 82px;
	transform: rotate(15deg);
`;

export const Freshness = () => (
	<Root>
		<Illustration>
			<LightningIcon color="#f0f0f5" width={265} height={265} />
		</Illustration>
		{/* <MiniLightningL color="#FFBC00" width={24} height={24} /> */}
		{/* <MiniLightningR color="#FFBC00" width={24} height={24} /> */}
		<TitleBlock align="center">
			<h6>No more stale data</h6>
			<h3>Sub-second Feature Freshness</h3>
		</TitleBlock>
	</Root>
);