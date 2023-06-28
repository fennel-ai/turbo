import styled from "@emotion/styled";
import { Container, TitleBlock } from "ui";
import { Space } from 'ddd';
import { Canvas, RootState } from '@react-three/fiber';
import { media } from "styles/utils";

const onCreated = ({ size, camera }: RootState) => {
	if (size.width < 600) {
		camera.position.z = 45;
	}
}

const Root = styled.div`
	position: relative;
	overflow: hidden;
	z-index: 0;
	padding: 8rem 0 1.5rem 0;
	background-color: ${({ theme }) => theme.background};
`;

const Wrapper = styled(Container)`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
`;

const Content = styled.div`
	grid-column: span 12;

	${media('md')} {
		grid-column: 3 / span 8;
	}
`;

const IntroText = styled.div`
	padding: 0;
	color: theme.get(text-low);

	${media('sm')} {
		padding: 0 2.5rem;
	}
	
	${media('md')} {
		padding: 0 6.5rem;
	}
`;

const Stars = styled.div`
	position: absolute;
	inset: 0;
	z-index: -2;
`;

const Hero = () => {
	return (
		<Root data-section>
			<Stars>
				<Canvas onCreated={onCreated}>
					<Space />
				</Canvas>
			</Stars>
			<Wrapper>
				<Content>
					<TitleBlock 
						center
					>
						<h1>Experience the Fastest ML Workflow</h1>
						<IntroText>
							<p>The team is excited to show you just how much Fennel is capable of; Submit a request today and we&apos;ll be in touch soon.</p>
						</IntroText>
					</TitleBlock>
				</Content>
			</Wrapper>
		</Root>
	);
};

export default Hero;
