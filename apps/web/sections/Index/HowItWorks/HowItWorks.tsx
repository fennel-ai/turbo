import styled from '@emotion/styled';
import { TitleBlock } from 'ui';
import PythonIcon from 'ui/icons/python.svg';

import { Container } from 'components/Container';
import { AccordionItem } from './AccordionItem';
import Diagram from './Diagram';

const Root = styled.div`
	padding: 5rem 0;
`;

const Wrapper = styled(Container)`
	display: flex;
	flex-direction: column;
	gap: 4rem;
	display: grid;
	grid-template-columns: repeat(12, 1fr);
`;

const TitleWrapper = styled.div`
	grid-column: 4 / span 6;
`;

const Accordion = styled.div`
	grid-column: span 4;
`;

const HowItWorks = () => {
	return (
		<Root>
			<Wrapper>
				<TitleWrapper>
					<TitleBlock
						align="center"
						subtitle="How it works"
						title="Read & Write Path Separation"
						text="The right abstraction for realtime feature engineering"
					/>
				</TitleWrapper>
				<Accordion>
					<AccordionItem icon={<PythonIcon />} title="Bring your Data">
						<p>Perspiciatis facilis earum. Qui delectus sed porro rerum tempora voluptates quia quis. Necessitatibus officiis fugiat quaerat consectetur possimus facere.</p>
					</AccordionItem>
					<AccordionItem icon={<PythonIcon />} title="Derive Features via Pipelines">
						<p>Perspiciatis facilis earum. Qui delectus sed porro rerum tempora voluptates quia quis. Necessitatibus officiis fugiat quaerat consectetur possimus facere.</p>
					</AccordionItem>
					<AccordionItem icon={<PythonIcon />} title="Define Features">
						<p>Perspiciatis facilis earum. Qui delectus sed porro rerum tempora voluptates quia quis. Necessitatibus officiis fugiat quaerat consectetur possimus facere.</p>
					</AccordionItem>
					<AccordionItem icon={<PythonIcon />} title="Query via the REST API">
						<p>Perspiciatis facilis earum. Qui delectus sed porro rerum tempora voluptates quia quis. Necessitatibus officiis fugiat quaerat consectetur possimus facere.</p>
					</AccordionItem>
				</Accordion>
				<Diagram />
			</Wrapper>
		</Root>
	);
};

export default HowItWorks;