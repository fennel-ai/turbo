import styled from '@emotion/styled';
import { useTheme } from "@emotion/react";
import { Button, Card, TitleBlock } from "ui";

import { SplitSection } from "components/SplitSection";
import VideoCTA from './VideoCTA';

const Root = styled(SplitSection)`
    background-color: ${({ theme }) => theme.surface};
`;

const Text = styled.p`
    font-size: 1rem;
    line-height: 1.5rem;
    font-variation-settings: "wght" 500;
    opacity: 0.7;
`;

const Incrementality = () => {
	return (
		<Root 
            gapSpan={1}
            illustrationSpan={6}
            contentSpan={5}
			direction="reverse" 
            illustration={<VideoCTA />}
		>
			<TitleBlock>
                <h6>Incremental Declarative Pipelines</h6>
                <h2>Fresher data. A fraction of the compute.</h2>
                <Text>A small portion of your data changes across iterations of a given pipeline, why recompute everything every time?</Text>
                <Text>Fennel’s CDC-aware engine, written in Rust, does automatic incremental computation proportional to changes and hence unlocks unprecedented efficiency and data freshness.</Text>
			</TitleBlock>
		</Root>
	);
};

export default Incrementality;