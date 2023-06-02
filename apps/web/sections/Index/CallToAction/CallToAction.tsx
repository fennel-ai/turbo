import styled from '@emotion/styled';
import { Button, LinkButton, TitleBlock } from "ui";

import { Container } from 'components/Container';

const Root = styled.div`
	padding-top: 5rem;
	background-color: #140F2E;
	color: #EBEBFA;
	overflow: hidden;
`;

const Wrapper = styled(Container)`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	row-gap: 7.5rem;
	margin-bottom: -4.5rem;

	& button {
		align-self: center;
	}
`;

const TitleWrapper = styled.div`
	grid-column: 3 / span 8;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
`;

const ConsoleImg = styled.div`
	border-radius: 1.25rem;
	background-color: #282150;
	height: 27.5rem;
	grid-column: 3 / span 8;
`;

const CallToAction = () => {
	return (
		<Root>
			<Wrapper>
				<TitleWrapper>
					<TitleBlock
						align="center"
					>
						<h2>Experience the fastest ML workflow</h2>
					</TitleBlock>
					<Button color="primary" label="Request a Demo" />
				</TitleWrapper>
				<ConsoleImg />
			</Wrapper>
		</Root>
	);
};

export default CallToAction;