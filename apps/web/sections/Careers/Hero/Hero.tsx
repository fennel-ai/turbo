import { Container, TitleBlock } from "ui";
import styled from '@emotion/styled';
import { media, rgba } from "styles/utils";

const Root = styled.div`
	position: relative;
	padding: 8rem 0 5rem 0;
	color: ${({ theme }) => theme.on};
	z-index: 0;
    border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const Background = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: -1;
	opacity: 0.15;
	background-size: cover;
	background-position: 50% 50%;
	background: conic-gradient(from 90deg at 1px 1px, #0000 90deg, ${({ theme }) => rgba(theme.on_alt, 0.64)} 0) 0 0/32px 32px;
	mask-image: radial-gradient(55.39% 50.37% at 50% 50%, #D9D9D9 0%, rgba(217, 217, 217, 0) 100%);
`;

const Wrapper = styled(Container)`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
`;

const Content = styled.div`
	grid-column: span 12;

	${media('md')} {
		grid-column: 4 / span 6;
	}
`;

const IntroText = styled.div`
	padding: 0;
	color: ${({ theme }) => theme.on_alt};
`;

const Hero = () => {
	return (
		<Root data-section>
			<Background />
			<Wrapper>
				<Content>
					<TitleBlock>
						<h1>Join the Team</h1>
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
