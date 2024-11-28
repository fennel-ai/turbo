import styled from '@emotion/styled';
import { useTheme } from "@emotion/react";
import { Card, TitleBlock } from "ui";

import { SplitSection } from "components/SplitSection";

const Text = styled.p`
    font-size: 1rem;
    line-height: 1.5rem;
    font-variation-settings: "wght" 500;
    opacity: 0.7;
`;

const VideoCard = styled(Card)`
    box-shadow: ${({ theme }) => theme.shadows.sheet};
    height: 24rem;
`;

const Incrementality = () => {
	return (
		<SplitSection 
			direction="reverse" 
            illustration={<VideoCard />}
		>
			<TitleBlock>
				<h6>Flexible and Powerful</h6>
                <h2>Incremental Declarative  Pipelines</h2>
                <Text>A small fraction of your data changes across iterations of a given pipeline, why recompute everything every time?</Text>
                <Text>Fennel's CDC-aware compute engine, written in Rust, does computation proportional to changes and hence unlocks unprecedented efficiency and data freshness.</Text>
			</TitleBlock>
		</SplitSection>
	);
};

export default Incrementality;