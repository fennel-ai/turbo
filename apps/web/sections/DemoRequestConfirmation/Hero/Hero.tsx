import { Container, TitleBlock } from "ui";
import styled from '@emotion/styled';
import { media } from "styles/utils";

const Root = styled.div`
	position: relative;
	overflow: hidden;
	z-index: 0;
	padding: 8rem 0 1.5rem 0;
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
	color: ${({ theme }) => theme.on_alt};

	${media('sm')} {
		padding: 0 2.5rem;
	}
	
	${media('md')} {
		padding: 0 6.5rem;
	}
`;

const Hero = () => {
	return (
		<Root data-section>
			<Wrapper>
				<Content>
					<TitleBlock 
						center
					>
						<h1>Thank you for your interest!</h1>
						<IntroText>
							<p>We&apos;ll get back to you shortly. In the meantime, feel free to directly schedule a meeting with Fennel AI&apos;s CEO, Nikhil Garg.</p>
						</IntroText>
					</TitleBlock>
				</Content>
			</Wrapper>
		</Root>
	);
};

export default Hero;
