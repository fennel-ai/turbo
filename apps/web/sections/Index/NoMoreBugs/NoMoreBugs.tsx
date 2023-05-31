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

const NoMoreBugs = () => {
	return (
		<SplitSection direction="reverse" illustration={<Illustration />}>
			<TitleBlock
				align="left"
				subtitle="Best-in-class data quality tooling"
				title="No more feature or data bugs"
			/>
			<Grid>
				<TextBlock icon={<PythonIcon />}>
					<b>Strong Typing</b><br />
					tempor sunt. Qui explicabo ut aut eum illum sint ut est a. Dolorem voluptatem eveniet quae.
				</TextBlock>
				<TextBlock icon={<PythonIcon />}>
					<b>Immutability & Versioning</b><br />
					tempor sunt. Qui explicabo ut aut eum illum sint ut est a. Dolorem voluptatem eveniet quae.
				</TextBlock>
				<TextBlock icon={<PythonIcon />}>
					<b>Unit Testing</b><br />
					tempor sunt. Qui explicabo ut aut eum illum sint ut est a. Dolorem voluptatem eveniet quae.
				</TextBlock>
				<TextBlock icon={<PythonIcon />}>
					<b>Compile Time Validation</b><br />
					tempor sunt. Qui explicabo ut aut eum illum sint ut est a. Dolorem voluptatem eveniet quae.
				</TextBlock>
				<TextBlock icon={<PythonIcon />}>
					<b>Data Expectation</b><br />
					tempor sunt. Qui explicabo ut aut eum illum sint ut est a. Dolorem voluptatem eveniet quae.
				</TextBlock>
				<TextBlock icon={<PythonIcon />}>
					<b>Online / Offline Skew</b><br />
					tempor sunt. Qui explicabo ut aut eum illum sint ut est a. Dolorem voluptatem eveniet quae.
				</TextBlock>
			</Grid>
			<LinkButton>
				Learn more about Data Quality with Fennel
			</LinkButton>
		</SplitSection>
	);
};

export default NoMoreBugs;