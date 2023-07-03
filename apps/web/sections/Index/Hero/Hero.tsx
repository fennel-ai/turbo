import { Button, Container, TitleBlock } from "ui";
import styled from '@emotion/styled';

import Link from "next/link";
import { media, rgba } from "styles/utils";

const Root = styled.div`
	position: relative;
	padding: 8rem 0;
	color: ${({ theme }) => theme.on};

	${media('md')} {
		padding: 15.5rem 0 8rem 0;
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
	background: conic-gradient(from 90deg at 1px 1px, #0000 90deg, ${({ theme }) => rgba(theme.on_alt, 0.64)} 0) 0 0/32px 32px;
	mask-image: radial-gradient(40.07% 50% at 50% 50%, #D9D9D9 0%, rgba(217, 217, 217, 0) 100%);
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
