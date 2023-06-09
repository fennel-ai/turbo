import styled from '@emotion/styled';
import { IconPuck, LinkButton, TitleBlock } from 'ui';
import { media } from 'styles/utils';
import ChartBreakoutIcon from 'ui/icons/chart-breakout-circle.svg';
import ShieldIcon from 'ui/icons/shield-03.svg';
import PiggyBankIcon from 'ui/icons/piggy-bank-01.svg';

import { Container } from 'components/Container';

const Root = styled.div`
	padding: 5rem 0;
	background-color: #f9f9fb;
	border-top: 1px solid #f0f0f5;
	border-bottom: 1px solid #f0f0f5;
`;

const Wrapper = styled(Container)`
	display: flex;
	flex-direction: column;
	gap: 4rem;

	${media('md', 'max')} {
		padding: 0;
	}
`;

const Grid = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	gap: 1rem;

	${media('xl')} {
		gap: 2rem;
		padding-left: 6.5rem;
		padding-right: 6.5rem;
	}

	${media('md', 'max')} {
		display: flex;
		align-items: stretch;
		overflow: auto;
		gap: 12px;
		padding: 0 2rem;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
		&::-webkit-scrollbar {
			display: none;
		}
	}
`;

const Cell = styled.div`
	grid-column: span 12;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1.5rem;
	text-align: center;
	padding: 0 1rem;
	align-self: flex-start;

	${media('md')} {
		grid-column: span 4;
	}

	${media('lg')} {
		padding: 0 2.5rem;
	}
	
	${media('md', 'max')} {
		position: relative;
		background-color: #f0f0f5;
		border-radius: 1rem;
		padding: 1rem;
		min-height: 280px;
		min-width: 100%;
		scroll-snap-align: center;
		z-index: 0;

		&::before {
			content: "";
			position: absolute;
			inset: 2px;
			background-color: #f9f9fb;
			z-index: -1;
			border-radius: calc(1rem - 2px);
		}
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
		<Root data-section>
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