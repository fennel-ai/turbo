import styled from '@emotion/styled';
import { LinkButton, TextBlock, TitleBlock } from "ui";
import PythonIcon from 'ui/icons/python.svg';

import { Illustration } from "components/Illustration";
import { SplitSection } from "components/SplitSection";

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	row-gap: 3rem;
	column-gap: 2rem;
`;

const ShipFaster = () => {
	return (
		<SplitSection illustration={<Illustration />}>
			<TitleBlock
				align="left"
				subtitle="Redefine your ML & Data Ops"
				title="Ship Features 100x Faster"
			/>
			<Grid>
				<TextBlock icon={<PythonIcon />}>
					<b>Real Python. No DSLs.</b><br />
					tempor sunt. Qui explicabo ut aut eum illum sint ut est a. Dolorem voluptatem eveniet quae.
				</TextBlock>
				<TextBlock icon={<PythonIcon />}>
					<b>Automatic Backfills</b><br />
					tempor sunt. Qui explicabo ut aut eum illum sint ut est a. Dolorem voluptatem eveniet quae.
				</TextBlock>
				<TextBlock button={<LinkButton>Learn more</LinkButton>} icon={<PythonIcon />}>
					<b>Fully Managed Infrastructure</b><br />
					tempor sunt. Qui explicabo ut aut eum illum sint ut est a. Dolorem voluptatem eveniet quae.
				</TextBlock>
				<TextBlock button={<LinkButton>Learn more</LinkButton>} icon={<PythonIcon />}>
					<b>Feature repository for reuse</b><br />
					tempor sunt. Qui explicabo ut aut eum illum sint ut est a. Dolorem voluptatem eveniet quae.
				</TextBlock>
			</Grid>
		</SplitSection>
	);
};

export default ShipFaster;