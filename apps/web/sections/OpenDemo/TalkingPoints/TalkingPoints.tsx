import { useCallback } from 'react';
import styled from '@emotion/styled';

import { media } from 'styles/utils';
import { Button, Container } from 'ui';

import EmpowersSVG from './empowers.svg';
import EngineSVG from './engine.svg';
import ApproachSVG from './approach.svg';

const Root = styled.div`
    position: relative;
    overflow: hidden;
    padding: 3rem 0;
	background-color: ${({ theme }) => theme.surface};

    ${media('md')} {
        padding: 4rem 0;
    }
`;

const Wrapper = styled(Container)`
	display: grid;
	grid-template-columns: repeat(12, minmax(0, 1fr));
    column-gap: 0;
    row-gap: 3rem;
    align-items: center;

    ${media('md')} {
        column-gap: 2rem;
        row-gap: 4rem;
    }
`;

const Title = styled.div`
    grid-column: span 12;
    text-align: center;

    & p {
        margin: 0;
        font-size: 1.125rem;
        line-height: 1.5rem;
        font-weight: 600;
        font-variation-settings: "wght" 600;

        ${media('md')} {
            font-size: 1.5rem;
        }
    }
`;

const TalkingPoint = styled.div`
    grid-column: span 12;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
    gap: 1.5rem;

    ${media('md')} {
        grid-column: span 4;
        gap: 2rem;
        font-size: 1.5rem;
    }

    & svg {
        width: 7rem;
        height: 7rem;
        overflow: visible;
        rect {
            filter: drop-shadow(0px 55.65px 15.4px rgba(0, 0, 0, 0.01)) drop-shadow(0px 35.7px 14.35px rgba(0, 0, 0, 0.04)) drop-shadow(0px 19.95px 11.9px rgba(0, 0, 0, 0.14)) drop-shadow(0px 8.75px 8.75px rgba(0, 0, 0, 0.24)) drop-shadow(0px 2.1px 4.9px rgba(0, 0, 0, 0.27));
        }
    }

    & p {
        margin: 0;
        font-size: 1rem;
        line-height: 1.5rem;
        font-weight: 500;
        font-variation-settings: "wght" 500;

        ${media('md')} {
            font-size: 1.25rem;
            line-height: 1.75rem;
        }
    }
`;

const Separator = styled.div`
    height: 0;
    grid-column: span 12;
    border-top: 0.5px solid ${({ theme }) => theme.border};
`;

const CTA = styled.div`
    grid-column: span 12;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;

    & p {
        margin: 0;
        font-size: 1.125rem;
        line-height: 1.5rem;
        font-weight: 500;
        font-variation-settings: "wght" 500;

        & b {
            font-weight: 700;
            font-variation-settings: "wght" 700;
        }

        ${media('md')} {
            font-size: 1.5rem;
            line-height: 2rem;
        }
    }
`;

const Hero = () => {

    const goToForm = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, []);

    return (
        <Root>
            <Wrapper>
                <Title>
                    <p>Join us to learn:</p>
                </Title>
                <TalkingPoint>
                    <EmpowersSVG />
                    <p>How Fennel empowers data science teams to achieve full autonomy, reducing dependence on engineering support.</p>
                </TalkingPoint>
                <TalkingPoint>
                    <EngineSVG />
                    <p>Fennels unified batch & real-time computation engine that is easier to use compared to systems like Spark and Flink, and will also cut costs.</p>
                </TalkingPoint>
                <TalkingPoint>
                    <ApproachSVG />
                    <p>How Fennel approaches ensuring high-quality and reliable data/feature pipelines.</p>
                </TalkingPoint>
                <Separator />
                <CTA>
                    <p>Join us on <b>Aug 6, 2024</b> for a deep dive into the latest trends in feature engineering. See you there!</p>
                    <Button color='primary' label="Register now for Aug 6th" shape="pill" onClick={goToForm} />
                </CTA>
            </Wrapper>
        </Root>
    );
};

export default Hero;