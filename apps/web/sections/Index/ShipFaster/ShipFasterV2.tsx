import styled from '@emotion/styled';
import { media } from 'styles/utils';
import { Container, TextBlock, TitleBlock } from "ui";
import PythonIcon from 'ui/icons/python.svg';
import ClockRefreshIcon from 'ui/icons/clock-refresh.svg';
import CubeIcon from 'ui/icons/cube-01.svg';
import SearchIcon from 'ui/icons/search.svg';


const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	row-gap: 1.5rem;
	column-gap: 1rem;
    padding: 1rem 0;

	${media('md')} {
        grid-template-columns: repeat(4, 1fr);
		row-gap: 3rem;
		column-gap: 2rem;
	}
`;


const Root = styled.div`
    padding-bottom: 3rem;
    ${media('md')} {
        padding-bottom: 5rem 0;
	}
`;




export const ShipFasterV2 = () => {
	return (
        <Root>
        <Container>
            <TitleBlock>
                <h6>Incredibly easy to install and use.</h6>
                <h2>Ship Features 100x Faster. Yes, 100x.</h2>
            </TitleBlock>
            <Grid>
                <TextBlock icon={<PythonIcon />}>
                    <b>Real Python. No DSLs.</b><br />
                    No DSL, no Spark or Flink jobs. Plain old Python & Pandas means zero learning curve for you.
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
        </Container>
        </Root>
	);
};
