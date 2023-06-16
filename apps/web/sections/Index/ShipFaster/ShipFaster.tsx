import styled from '@emotion/styled';
import { media } from 'styles/utils';
import { LinkButton, TextBlock, TitleBlock } from "ui";
import PythonIcon from 'ui/icons/python.svg';
import ClockRefreshIcon from 'ui/icons/clock-refresh.svg';
import CubeIcon from 'ui/icons/cube-01.svg';
import SearchIcon from 'ui/icons/search.svg';

import { Illustration } from "components/Illustration";
import { SplitSection } from "components/SplitSection";

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	row-gap: 1.5rem;
	column-gap: 1rem;

	${media('md')} {
		row-gap: 3rem;
		column-gap: 2rem;
	}
`;

const ShipFaster = () => {
	return (
		<SplitSection illustration={<Illustration />}>
			<TitleBlock align="left">
				<h6>Incredibly easy to install & use</h6>
				<h2>Ship Features 100x Faster. <br /> Yes, 100x!</h2>
			</TitleBlock>
			<Grid>
				<TextBlock icon={<PythonIcon />}>
					<b>Real Python. No DSLs.</b><br />
					No DSL, no Spark or Flink jobs. Plain old Python & Pandas mean zero learning curve for you.
				</TextBlock>
				<TextBlock icon={<ClockRefreshIcon />}>
					<b>Automatic Backfills</b><br />
					Pipelines backfill automatically on declaration - no more pesky one off scripts.
				</TextBlock>
				<TextBlock button={<LinkButton>Learn more</LinkButton>} icon={<CubeIcon />}>
					<b>Fully-Managed Infrastructure</b><br />
					Fennel brings up & manages everything that is needed - zero dependencies on your prod infra.
				</TextBlock>
				<TextBlock button={<LinkButton>Learn more</LinkButton>} icon={<SearchIcon />}>
					<b>Feature repository for reuse</b><br />
					Write standardized features once, share & reuse across all your use cases.
				</TextBlock>
			</Grid>
		</SplitSection>
	);
};

export default ShipFaster;