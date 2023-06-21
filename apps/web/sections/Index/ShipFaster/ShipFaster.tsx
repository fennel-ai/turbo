import styled from '@emotion/styled';
import { media } from 'styles/utils';
import { useEffect } from 'react';
import { TextBlock, TitleBlock } from "ui";
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import useMeasure from 'react-use-measure';
import PythonIcon from 'ui/icons/python.svg';
import ClockRefreshIcon from 'ui/icons/clock-refresh.svg';
import CubeIcon from 'ui/icons/cube-01.svg';
import SearchIcon from 'ui/icons/search.svg';

import { Illustration } from "components/Illustration";
import { SplitSection } from "components/SplitSection";
import { useScrollProgress } from 'hooks';

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

const ConsoleImg = styled(Illustration)`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	overflow: hidden;
	
	& img {
		mask-image: linear-gradient(to top, rgba(0, 0, 0, 0) 32%, rgba(0, 0, 0, 1) 100%);
		position: absolute;
		top: 3rem;
		left: 2.5rem;
		flex-shrink: 0;
		width: 1298px;
		height: 888px;
	}
`;

const ShipFaster = () => {
	const [ref, progress] = useScrollProgress();
	const y = useTransform(progress, [0, 1], [64, -24])

	return (
		<SplitSection 
			ref={ref}
			illustration={
				<ConsoleImg>
					<motion.div style={{ y, position: 'absolute', inset: 0 }}>
						<Image src="/images/ship_faster.png" alt="Fenel Console Dashboard" width={3894} height={2664} />
					</motion.div>
				</ConsoleImg>
			}
		>
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
				<TextBlock icon={<CubeIcon />}>
					<b>Fully-Managed Infrastructure</b><br />
					Fennel brings up & manages everything that is needed - zero dependencies on your prod infra.
				</TextBlock>
				<TextBlock icon={<SearchIcon />}>
					<b>Feature repository for reuse</b><br />
					Write standardized features once, share & reuse across all your use cases.
				</TextBlock>
			</Grid>
		</SplitSection>
	);
};

export default ShipFaster;