import { Button, Container, TitleBlock } from "ui";
import styled from '@emotion/styled';

import Link from "next/link";
import { media } from "styles/utils";

const Root = styled.div`
	position: relative;
	padding: 8rem 0;
	color: ${({ theme }) => theme.on};

	${media('md')} {
		padding: 15.5rem 0;
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
	mask-image: radial-gradient(29.07% 36% at 50% 50%, #D9D9D9 0%, rgba(217, 217, 217, 0) 100%);
`;

const Wrapper = styled(Container)`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
`;

const Content = styled.div`
	grid-column: span 12;
	${media('md')} {
		grid-column: 2 / span 10;
	}
`;

const IntroText = styled.div`
	padding: 0;
	color: ${({ theme }) => theme.on_alt};

	${media('sm')} {
		padding: 0 2.5rem;
	}
	
	${media('md')} {
		max-width: 50rem;
		padding: 0 6.5rem;
	}
`;

const Hero = () => {
	return (
		<Root data-section>
			<Background />
			<Wrapper>
				<Content>
					<TitleBlock 
						center
						actions={[
							<Link href="https://fennel.ai/docs">
								<Button label="Read the Documentation" color="primary" />
							</Link>
						]}
					>
						<h1>Realtime Feature Platform. Beautifully Built.</h1>
						<IntroText>
							<p>Fennel helps you author, compute, store, serve, monitor & govern both realtime and batch ML features.</p>
						</IntroText>
					</TitleBlock>
				</Content>
			</Wrapper>
		</Root>
	);
};

export default Hero;
