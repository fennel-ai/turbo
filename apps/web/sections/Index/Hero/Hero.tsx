import styled from '@emotion/styled';
import { LinkButton, TitleBlock } from "ui";

import { Container } from 'components/Container';

import Background from './Background';
import { media } from 'styles/utils';

const Root = styled.div`
	position: relative;
	padding: 15.5rem 0;
`;

const Wrapper = styled(Container)`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
`;

const Content = styled.div`
	grid-column: span 12;

	${media("md")} {
		grid-column: 3 / span 8;
	}
`;

const IntroText = styled.div`
	padding: 0;

	${media("sm")} {
		padding: 0 2.5rem;
	}

	${media("md")} {
		padding: 0 6.5rem;
	}
`;

const BG = styled(Background)`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: -1;
`;

const Hero = () => {
	return (
		<Root>
			<BG  />
			<Wrapper>
				<Content>
					<TitleBlock 
						align="center"
						actions={[
							<LinkButton>
								Read the Documentation
							</LinkButton>,
							<LinkButton>
								Request a Demo
							</LinkButton>
						]}
					>
						<h1>Feature Engineering for Modern Data Scientists</h1>
						<IntroText>
							<p>Enterprise-grade ML infrastructure for teams of all sizes. Fennel is a feature engineering platform designed to help you store, serve, discover and scale with ease.</p>
						</IntroText>
					</TitleBlock>
				</Content>
			</Wrapper>
		</Root>
	);
};

export default Hero;
