import styled from '@emotion/styled';
import { IconPuck, LinkButton, TitleBlock } from 'ui';
import PythonIcon from 'ui/icons/python.svg';

import { Container } from 'components/Container';

const Root = styled.div`
	padding: 5rem 0;
`;

const Wrapper = styled(Container)`
	display: flex;
	flex-direction: column;
	gap: 4rem;
`;

const Grid = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	gap: 2rem;
`;

const Cell = styled.div`
	grid-column: span 4;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1.5rem;
	text-align: center;
`;

const TextGroup = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	h3 {
		margin: 0;
	}

	p {
		margin: 0;
	}
`;

const HowItWorks = () => {
	return (
		<Root>
			<Wrapper>
				<TitleBlock
					align="center"
					subtitle="How it works"
					title="Read & Write Path Separation"
					text="The right abstraction for realtime feature engineering"
				/>
			</Wrapper>
		</Root>
	);
};

export default HowItWorks;