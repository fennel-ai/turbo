import { Container, TitleBlock } from "ui";
import styled from '@emotion/styled';
import { media } from "styles/utils";

const Root = styled.div`
	position: relative;
	padding: 8rem 0 0 0;
	color: ${({ theme }) => theme.on};
`;

const Background = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: -1;
	background-size: cover;
	background-position: 50% 50%;
	background-image: url("/images/company_hero.png");
	mask-image: radial-gradient(55.39% 50.37% at 50% 50%, #D9D9D9 0%, rgba(217, 217, 217, 0) 100%);
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
			<Background />
			<Wrapper>
				<Content>
					<TitleBlock 
						center
					>
						<h1>Built by the creators of ML Infrastructure at Facebook.</h1>
						<IntroText>
							<p>Fennel is an ex-Facebook/Google team on a mission to enable companies and teams of any size to harness realtime machine learning to build delightful products for their customers.</p>
						</IntroText>
					</TitleBlock>
				</Content>
			</Wrapper>
		</Root>
	);
};

export default Hero;
