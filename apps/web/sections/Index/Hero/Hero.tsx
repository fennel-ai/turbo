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
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1.5rem;
`;

const Actions = styled.div`
	display: flex;
	align-items: center;
	flex-direction: row;
`;

const Hero = () => {
	return (
		<Root>
			<Wrapper>
				<Content>
					<TitleBlock
						align="center"
						size="large"
						title="Feature Engineering for Modern Data Scientists"
						text="Enterprise-grade ML infrastructure for teams of all sizes. Fennel is a feature engineering platform designed to help you store, serve, discover and scale with ease."
					/>
					<Actions>
						<LinkButton>
							Read the Documentation
						</LinkButton>
					</Actions>
				</Content>
			</Wrapper>
		</Root>
	);
};

export default Hero;
