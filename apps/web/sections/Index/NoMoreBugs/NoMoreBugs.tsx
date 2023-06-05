import styled from '@emotion/styled';
import { media } from 'styles/utils';
import { LinkButton, TextBlock, TitleBlock } from "ui";
import BeakerIcon from 'ui/icons/beaker-01.svg';
import CheckVerifiedIcon from 'ui/icons/check-verified-01.svg';
import DataIcon from 'ui/icons/data.svg';
import SafeIcon from 'ui/icons/safe.svg';
import ShieldTickIcon from 'ui/icons/shield-tick.svg';
import SkewIcon from 'ui/icons/skew.svg';

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

const NoMoreBugs = () => {
	return (
		<SplitSection direction="reverse" illustration={<Illustration />}>
			<TitleBlock align="left">
				<h6>Best-in-class data quality tooling</h6>
				<h2>No more feature or data bugs</h2>
			</TitleBlock>
			<Grid>
				<TextBlock icon={<ShieldTickIcon />}>
					<b>Strong Typing</b><br />
					tempor sunt. Qui explicabo ut aut eum illum sint ut est a. Dolorem voluptatem eveniet quae.
				</TextBlock>
				<TextBlock icon={<SafeIcon />}>
					<b>Immutability & Versioning</b><br />
					tempor sunt. Qui explicabo ut aut eum illum sint ut est a. Dolorem voluptatem eveniet quae.
				</TextBlock>
				<TextBlock icon={<BeakerIcon />}>
					<b>Unit Testing</b><br />
					tempor sunt. Qui explicabo ut aut eum illum sint ut est a. Dolorem voluptatem eveniet quae.
				</TextBlock>
				<TextBlock icon={<CheckVerifiedIcon />}>
					<b>Compile Time Validation</b><br />
					tempor sunt. Qui explicabo ut aut eum illum sint ut est a. Dolorem voluptatem eveniet quae.
				</TextBlock>
				<TextBlock icon={<DataIcon />}>
					<b>Data Expectation</b><br />
					tempor sunt. Qui explicabo ut aut eum illum sint ut est a. Dolorem voluptatem eveniet quae.
				</TextBlock>
				<TextBlock icon={<SkewIcon />}>
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