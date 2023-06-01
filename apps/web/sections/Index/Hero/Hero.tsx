import styled from '@emotion/styled';
import { LinkButton, TitleBlock } from "ui";

import { Container } from '../../../components/Container';

const Root = styled.div`
	padding: 5rem 0;
`;

const Wrapper = styled(Container)`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
`;

const Content = styled.div`
	grid-column: 3 / span 8;
`;

const Hero = () => {
	return (
		<Root>
			<Wrapper>
				<Content>
					<TitleBlock 
						align="center"
						actions={[
							<LinkButton>
								Read the Documentation
							</LinkButton>
						]}
					>
						<h1>Feature Engineering for Modern Data Scientists</h1>
						<p>Enterprise-grade ML infrastructure for teams of all sizes. Fennel is a feature engineering platform designed to help you store, serve, discover and scale with ease.</p>
					</TitleBlock>
				</Content>
			</Wrapper>
		</Root>
	);
};

export default Hero;
