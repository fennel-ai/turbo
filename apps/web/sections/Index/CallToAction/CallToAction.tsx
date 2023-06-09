import styled from '@emotion/styled';
import { Button, LinkButton, TitleBlock } from "ui";

import { Container } from 'components/Container';
import { media } from 'styles/utils';

const Root = styled.div`
	padding-top: 2.5rem;
	background-color: #0C091B;
	color: #EBEBFA;
	overflow: hidden;

	${media('sm')} {
		padding-top: 5rem;
	}
`;

const Wrapper = styled(Container)`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	row-gap: 3rem;
	margin-bottom: -4.5rem;

	& button {
		align-self: center;
	}

	${media('md')} {
		row-gap: 7.5rem;
	}
`;

const TitleWrapper = styled.div`
	grid-column: span 12;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;

	${media('md')} {
		grid-column: 3 / span 8;
	}
`;

const ConsoleImg = styled.div`
	border-radius: 1.25rem;
	background-color: #282150;
	height: 16rem;
	grid-column: span 12;

	${media('md')} {
		height: 27.5rem;
		grid-column: 3 / span 8;
	}
`;

const CallToAction = () => {
	return (
		<Root data-section data-theme="dark">
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