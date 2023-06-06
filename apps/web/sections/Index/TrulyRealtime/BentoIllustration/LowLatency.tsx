import styled from '@emotion/styled';
import { media } from 'styles/utils';
import { Card, TitleBlock } from 'ui';

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
	top: 1.5rem;
`;


export const LowLatency = () => (
	<Root>
		<Illustration>
			<svg width="482" height="482" viewBox="0 0 482 482" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g opacity="0.64">
					<rect x="1" y="1" width="480" height="480" rx="240" fill="#6958CA" fill-opacity="0.01" />
					<rect x="0.693878" y="0.693878" width="480.612" height="480.612" rx="240.306" stroke="#6958CA" stroke-opacity="0.16" stroke-width="0.612245" />
					<rect x="105.081" y="105.082" width="271.837" height="271.837" rx="135.918" fill="#6958CA" fill-opacity="0.03" />
					<rect x="104.775" y="104.776" width="272.449" height="272.449" rx="136.224" stroke="#6958CA" stroke-opacity="0.16" stroke-width="0.612245" />
					<rect x="51.2041" y="51.2061" width="379.592" height="379.592" rx="189.796" fill="#6958CA" fill-opacity="0.02" />
					<rect x="50.898" y="50.8999" width="380.204" height="380.204" rx="190.102" stroke="#6958CA" stroke-opacity="0.16" stroke-width="0.612245" />
				</g>
			</svg>
		</Illustration>
		<TitleBlock align="center">
			<h6>Single-digit ms response</h6>
			<h3>Ultra-low Latency Serving</h3>
		</TitleBlock>
	</Root>
);