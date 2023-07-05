import styled from '@emotion/styled';
import { Container, IconPuck, PillButton, TitleBlock } from 'ui';
import ChartBreakoutIcon from 'ui/icons/chart-breakout-circle.svg';
import ShieldIcon from 'ui/icons/shield-03.svg';
import PiggyBankIcon from 'ui/icons/piggy-bank-01.svg';

import Link from 'next/link';
import { media, rgba } from 'styles/utils';

const Root = styled.div`
	position: relative;
	padding: 5rem 0;
	background-color: ${({ theme }) => theme.background};
	border-top: 0.5px solid ${({ theme }) => rgba(theme.on_alt, 0.06)};
	border-bottom: 0.5px solid ${({ theme }) => rgba(theme.on_alt, 0.06)};
`;

const Background = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 0;
	opacity: 0.08;
	background: conic-gradient(from 90deg at 1px 1px, #0000 90deg, ${({ theme }) => rgba(theme.on_alt, 0.64)} 0) 0 0/32px 32px;
	mask-image: radial-gradient(40.06% 90.98% at 50% 40%, #D9D9D9 0%, rgba(217, 217, 217, 0) 100%);
`;

const Wrapper = styled(Container)`
	display: flex;
	flex-direction: column;
	gap: 4rem;

	${media('sm', 'max')} {
		padding: 0;
	}
`;

const Grid = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	gap: 1rem;

	${media('sm', 'max')} {
		display: flex;
		align-items: stretch;
		overflow: auto;
		gap: 8px;
		padding: 0 3rem 0 1rem;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
	
		&::-webkit-scrollbar {
			display: none;
		}
	}

	${media('xl')} {
		gap: 1rem;
		padding-left: 6.5rem;
		padding-right: 6.5rem;
	}
`;

const Cell = styled.div`
	grid-column: span 12;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 1rem;
	text-align: left;
	padding: 1.5rem;
	border-radius: 1rem;
	background-color: ${({ theme }) => theme.border};
	background-image: radial-gradient(25.69% 43.07% at 16.54% 27.23%, rgba(105, 88, 202, 0.2) 21.87%, rgba(105, 88, 202, 0) 100%);
	position: relative;
	z-index: 0;
	overflow: hidden;

	&::before {
		content: "";
		pointer-events: none;
		position: absolute;
		inset: 1px;
		background-color: ${({ theme }) => theme.glass};
		backdrop-filter: blur(1rem);
		border-radius: calc(1rem - 1px);
		z-index: -1;
	}

	${media('sm')} {
		grid-column: span 4;
	}

	${media('sm', 'max')} {
		min-width: 100%;
		scroll-snap-align: center;
		z-index: 0;
	}
`;

const TextGroup = styled.div`
	display: flex;
	flex-direction: column;

	h3 {
		margin: 0;
		font-size: 1.125rem;
		line-height: 2rem;
		font-variation-settings: "wght" 600;
		color: ${({ theme }) => theme.on};
	}

	p {
		margin: 0;
		font-size: 1rem;
		line-height: 1.5rem;
		font-variation-settings: "wght" 400;
		color: ${({ theme }) => theme.on_alt};
		opacity: 0.8;
	}
`;

const HassleFreeScaling = () => {
	return (
		<Root data-section>
			<Background />
			<Wrapper>
				<TitleBlock center>
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
						<Link href="https://fennel.ai/docs/architecture/overview/">
							<PillButton>Learn More</PillButton>
						</Link>
					</Cell>
					<Cell>
						<IconPuck>
							<ShieldIcon />
						</IconPuck>
						<TextGroup>
							<h3>Enterprise-grade Security</h3>
							<p>SOC2-compliant deployment inside your VPC.</p>
						</TextGroup>
						<Link href="https://fennel.ai/docs/architecture/privacy-security/">
							<PillButton>Learn More</PillButton>
						</Link>
					</Cell>
					<Cell>
						<IconPuck>
							<PiggyBankIcon />
						</IconPuck>
						<TextGroup>
							<h3>Cloud Cost Efficiency</h3>
							<p>Lower cloud cost for the same workload & performance.</p>
						</TextGroup>
						<Link href="https://fennel.ai/docs/architecture/cost-optimizations/">
							<PillButton>Learn More</PillButton>
						</Link>
					</Cell>
				</Grid>
			</Wrapper>
		</Root>
	);
};

export default HassleFreeScaling;