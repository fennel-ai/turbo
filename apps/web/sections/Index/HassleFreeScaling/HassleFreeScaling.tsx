import styled from '@emotion/styled';
import { IconPuck, LinkButton, TitleBlock } from 'ui';
import ChartBreakoutIcon from 'ui/icons/chart-breakout-circle.svg';
import ShieldIcon from 'ui/icons/shield-03.svg';
import PiggyBankIcon from 'ui/icons/piggy-bank-01.svg';

import { Container } from 'components/Container';
import { media } from 'styles/utils';

const Root = styled.div`
	padding: 5rem 0;
	border-top: 1px solid #f0f0f5;
	border-bottom: 1px solid #f0f0f5;
`;

const Wrapper = styled(Container)`
	display: flex;
	flex-direction: column;
	gap: 4rem;
`;

const Grid = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	gap: 2rem;
	padding-left: 6.5rem;
	padding-right: 6.5rem;
`;

const Cell = styled.div`
	grid-column: span 12;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1.5rem;
	text-align: center;
	padding: 0 2.5rem;

	${media('md')} {
		grid-column: span 4;
	}
`;

const TextGroup = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	h3 {
		margin: 0;
	}

	p {
		margin: 0;
		opacity: 0.8;
		font-size: 1.125rem;
		line-height: 1.75rem;
	}
`;

const HassleFreeScaling = () => {
	return (
		<Root>
			<Wrapper>
				<TitleBlock align="center">
					<h6>Enterprise-Grade Performance</h6>
					<h2>Hassle-free Scaling</h2>
				</TitleBlock>
				<Grid>
					<Cell>
						<IconPuck>
							<ChartBreakoutIcon />
						</IconPuck>
						<TextGroup>
							<h3>Scalability & Reliability</h3>
							<p>Scale to billions of feature queries without lifting a finger.</p>
						</TextGroup>
						<LinkButton>Learn More</LinkButton>
					</Cell>
					<Cell>
						<IconPuck>
							<ShieldIcon />
						</IconPuck>
						<TextGroup>
							<h3>Enterprise-grade Security</h3>
							<p>Complete with SOC2 Compliance.</p>
						</TextGroup>
						<LinkButton>Learn More</LinkButton>
					</Cell>
					<Cell>
						<IconPuck>
							<PiggyBankIcon />
						</IconPuck>
						<TextGroup>
							<h3>Cost Efficiency</h3>
							<p>Low-cost whilst maintaining maximal performance.</p>
						</TextGroup>
						<LinkButton>Learn More</LinkButton>
					</Cell>
				</Grid>
			</Wrapper>
		</Root>
	);
};

export default HassleFreeScaling;