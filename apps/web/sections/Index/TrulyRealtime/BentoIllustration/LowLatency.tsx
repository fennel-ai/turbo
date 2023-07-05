import styled from '@emotion/styled';
import { keyframes, useTheme } from '@emotion/react';
import { media } from 'styles/utils';
import { Card, TitleBlock } from 'ui';

import LightningIcon from 'ui/icons/lightning-01.svg';

const wiggle = keyframes`
	0% { transform: rotate(0deg); }
	80% { transform: rotate(0deg); }
	85% { transform: rotate(5deg); }
	95% { transform: rotate(-5deg); }
	100% { transform: rotate(0deg); }
`;

const Root = styled(Card)`
	position: relative;
	grid-column: span 2;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 1rem;
	overflow: hidden;
	background-color: ${({ theme }) => theme.glass};
	border: 0.5px solid ${({ theme }) => theme.border};

	${media('sm')} {
		grid-column: span 1;
	}
`;

const Illustration = styled.div`
	position: absolute;
	z-index: -1;
	@media (prefers-reduced-motion: no-preference) {
		animation: ${wiggle} 1.5s linear infinite;
	}
`;

const Text = styled(TitleBlock)`
	
`;


export const LowLatency = () => {
	const theme = useTheme();
	return (
		<Root>
			<Illustration>
				<LightningIcon color={theme.border} width={265} height={265} />
			</Illustration>
			<Text center>
				<h6>Single-digit ms response</h6>
				<h3>Ultra-low Latency Serving</h3>
			</Text>
		</Root>
	);
}