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
	grid-template-columns: 1fr;
	row-gap: 1.5rem;
	column-gap: 1rem;

	${media('2xs')} {
		grid-template-columns: repeat(2, 1fr);
	}

	${media('md')} {
		row-gap: 3rem;
		column-gap: 2rem;
	}
`;

const ShipFaster = () => {
	return (
		<SplitSection illustration={<Illustration />}>
			<TitleBlock align="left">
				<h6>Redefine your ML & Data Ops</h6>
				<h2>Ship Features 100x Faster</h2>
			</TitleBlock>
			<Grid>
				<TextBlock icon={<PythonIcon />}>
					<b>Real Python. No DSLs.</b><br />
					tempor sunt. Qui explicabo ut aut eum illum sint ut est a. Dolorem voluptatem eveniet quae.
				</TextBlock>
				<TextBlock icon={<ClockRefreshIcon />}>
					<b>Automatic Backfills</b><br />
					tempor sunt. Qui explicabo ut aut eum illum sint ut est a. Dolorem voluptatem eveniet quae.
				</TextBlock>
				<TextBlock button={<LinkButton>Learn more</LinkButton>} icon={<CubeIcon />}>
					<b>Fully Managed Infrastructure</b><br />
					tempor sunt. Qui explicabo ut aut eum illum sint ut est a. Dolorem voluptatem eveniet quae.
				</TextBlock>
				<TextBlock button={<LinkButton>Learn more</LinkButton>} icon={<SearchIcon />}>
					<b>Feature repository for reuse</b><br />
					tempor sunt. Qui explicabo ut aut eum illum sint ut est a. Dolorem voluptatem eveniet quae.
				</TextBlock>
			</Grid>
		</SplitSection>
	);
};

export default ShipFaster;