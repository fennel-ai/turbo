import styled from '@emotion/styled';
import { LinkButton, TitleBlock } from "ui";

import { Container } from 'components/Container';

const Root = styled.div`
	padding: 5rem 0;
`;

const CallToAction = () => {
	return (
		<Root>
			<TitleBlock
				align="center"
			>
				<h2>Experience the fastest ML workflow</h2>
			</TitleBlock>
		</Root>
	);
};

export default CallToAction;