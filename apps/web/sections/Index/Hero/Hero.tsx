import styled from '@emotion/styled';
import { LinkButton, TitleBlock } from "ui";

import { Container } from 'components/Container';

import { media } from 'styles/utils';

const Root = styled.div`
	position: relative;
	padding: 15.5rem 0;
	background-image: linear-gradient(249.06deg, rgba(105, 88, 202, 0.1184) 6.93%, rgba(252, 253, 255, 0.00215977) 42.36%, rgba(255, 255, 255, 0) 53.77%, rgba(246, 249, 255, 0.00744363) 79.89%, rgba(67, 135, 253, 0.16) 101.08%);
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

const Background = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: -1;
	opacity: 0.15;
	background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABNSURBVHgB7c8BDYAADASxB/+eQcZlSeugz7Zvx50OvDtOoCZQE6gJ1ARqAjWBmkBNoCZQE6gJ1ARqAjWBmkBNoCZQE6gJ1ARqArXzgR/6PgJcGGar1gAAAABJRU5ErkJggg=="); 
	background-size: 31px;
	mask-image: radial-gradient(29.07% 49.94% at 50% 50%, #D9D9D9 0%, rgba(217, 217, 217, 0) 100%);
`;

const Hero = () => {
	return (
		<Root>
			<Background />
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
