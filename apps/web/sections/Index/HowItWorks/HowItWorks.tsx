import { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { media } from 'styles/utils';
import { TitleBlock } from 'ui';
import CodeIcon from 'ui/icons/code.svg';
import DataIcon from 'ui/icons/data.svg';
import GlobeIcon from 'ui/icons/globe.svg';
import PipelineIcon from 'ui/icons/pipeline.svg';

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

	${media("sm")} {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
	}
`;

const TitleWrapper = styled.div`
	grid-column: 4 / span 6;
	order: -2;
`;

const Accordion = styled.div`
	grid-column: span 4;
`;

const HowItWorks = () => {
	const [activeItem, setActiveItem] = useState(0);
	const [animate, toggleAnimate] = useState(true);

	const onComplete = useCallback(() => {
		setActiveItem(prev => (prev + 1) % 4);
	}, []);

	const toggleItem = (i: number) => {
		toggleAnimate(false);
		setActiveItem(i);
	};

	return (
		<Root>
			<Wrapper>
				<TitleWrapper>
					<TitleBlock align="center">
						<h6>How it works</h6>
						<h2>Read & Write Path Separation</h2>
						<p>The right abstraction for realtime feature engineering</p>
					</TitleBlock>
				</TitleWrapper>
				<Accordion>
					<AccordionItem animate={animate} open={activeItem === 0} onToggle={() => toggleItem(0)} onComplete={onComplete} icon={<DataIcon />} title="Bring your Data">
						<p>Perspiciatis facilis earum. Qui delectus sed porro rerum tempora voluptates quia quis. Necessitatibus officiis fugiat quaerat consectetur possimus facere.</p>
					</AccordionItem>
					<AccordionItem animate={animate} open={activeItem === 1} onToggle={() => toggleItem(1)} onComplete={onComplete} icon={<PipelineIcon />} title="Derive Features via Pipelines">
						<p>Perspiciatis facilis earum. Qui delectus sed porro rerum tempora voluptates quia quis. Necessitatibus officiis fugiat quaerat consectetur possimus facere.</p>
					</AccordionItem>
					<AccordionItem animate={animate} open={activeItem === 2} onToggle={() => toggleItem(2)} onComplete={onComplete} icon={<CodeIcon />} title="Define Features">
						<p>Perspiciatis facilis earum. Qui delectus sed porro rerum tempora voluptates quia quis. Necessitatibus officiis fugiat quaerat consectetur possimus facere.</p>
					</AccordionItem>
					<AccordionItem animate={animate} open={activeItem === 3} onToggle={() => toggleItem(3)} onComplete={onComplete} icon={<GlobeIcon />} title="Query via the REST API">
						<p>Perspiciatis facilis earum. Qui delectus sed porro rerum tempora voluptates quia quis. Necessitatibus officiis fugiat quaerat consectetur possimus facere.</p>
					</AccordionItem>
				</Accordion>
				<Diagram />
			</Wrapper>
		</Root>
	);
};

export default HowItWorks;