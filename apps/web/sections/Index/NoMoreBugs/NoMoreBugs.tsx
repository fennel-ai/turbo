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
import Image from 'next/image';
import Link from 'next/link';

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

const CTAButton = styled(LinkButton)`
	align-self: center;

	${media('sm')} {
		align-self: flex-start;
	}
`;

const ExpectationsImg = styled(Illustration)`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	overflow: hidden;
	& img {
		mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 70%);
		position: absolute;
		left: 2.5rem;
		bottom: 3rem;
		flex-shrink: 0;
		width: 812px;
		height: 460px;
		
		${media('sm')} {
			width: 1202px;
			height: 680px;
		}
	}
`;

const NoMoreBugs = () => {
	return (
		<SplitSection 
			direction="reverse" 
			illustration={
				<ExpectationsImg>
					<Image src="/images/expectations.png" width={3606} height={2040} alt="Data Expectations" />
				</ExpectationsImg>
			}
		>
			<TitleBlock align="left">
				<h6>Best-in-class data quality tooling</h6>
				<h2>No more feature or data bugs</h2>
			</TitleBlock>
			<Grid>
				<TextBlock icon={<ShieldTickIcon />}>
					<b>Strong Typing</b><br />
					Catch typing bugs at compile time and at source of data, thanks to strong typing.
				</TextBlock>
				<TextBlock icon={<SafeIcon />}>
					<b>Immutability & Versioning</b><br />
					Immutable & versioned features to eliminate offline online skew due to definition changes.
				</TextBlock>
				<TextBlock icon={<BeakerIcon />}>
					<b>Unit Testing</b><br />
					Prevent unforced errors by writing unit tests across batch & realtime pipelines.
				</TextBlock>
				<TextBlock icon={<CheckVerifiedIcon />}>
					<b>Compile Time Validation</b><br />
					Strict end to end lineage validation at compile time to prevent runtime errors.
				</TextBlock>
				<TextBlock icon={<DataIcon />}>
					<b>Data Expectation</b><br />
					Specify expected data distributions, get alerted when things go wrong.
				</TextBlock>
				<TextBlock icon={<SkewIcon />}>
					<b>Online / Offline Skew</b><br />
					Single definition of feature across both offline and online scenarios.
				</TextBlock>
			</Grid>
			<Link href="https://docs.fennel.ai/data-quality/approach/">
				<CTAButton>
					Data Quality with Fennel
				</CTAButton>
			</Link>
		</SplitSection>
	);
};

export default NoMoreBugs;