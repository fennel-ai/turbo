import { useState } from 'react';
import styled from '@emotion/styled';

import { media } from 'styles/utils';
import { Button, Container } from 'ui';
import CheckCircleIcon from 'ui/icons/check-circle.svg';

import ApproachSVG from './approach.svg';
import EmpowersSVG from './empowers.svg';
import EngineSVG from './engine.svg';

import AuthorBlock from 'components/AuthorBlock';
import GlobeSVG from './globe.svg';
import OpenDemoRegistrationForm from 'components/OpenDemoRegistrationForm';

const Root = styled.div`
    position: relative;
    overflow: hidden;
    padding: 3rem 0 0 0;
	background-color: ${({ theme }) => theme.surface};
    color: ${({ theme }) => theme.on};
    z-index: 0;
    min-height: calc(100vh - 4rem);

    ${media('md')} {
        padding: 5rem 0 0 0;
    }
`;

const Wrapper = styled(Container)`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
    gap: 2rem;
    align-items: center;
    ${media('md')} {
        padding-top: 4rem;
        padding-bottom: 4rem;
    }
`;

const Content = styled.div`
    grid-column: span 12;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    ${media('md')} {
        grid-column: 6 / span 7;
    }

    & > p {
        margin: 0;
        font-size: 1rem;
        line-height: 1.5rem;
        font-weight: 500;
        font-variation-settings: 'wght' 500;
        max-width: 39.25rem;

        ${media('md')} {
            font-size: 1.125rem;
            line-height: 1.5rem;
        }
    }
`;

const Title = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h1 {
        font-size: 2rem;
        line-height: 2.25rem;
        font-weight: 700;
        font-variation-settings: 'wght' 700;
        margin: 0;

        ${media('md')} {
            font-size: 3.5rem;
            line-height: 4rem;
        }
    }
`;

const Form = styled.div`
    order: 2;
    position: relative;
    grid-column: span 12;
    background-color: ${({ theme }) => theme.border};
    padding: 1rem;
    border-radius: 0.5rem;
    transform: translate3d(0, 0, 0);
    border: 1px solid ${({ theme }) => theme.color.purple['30']}; 
    
    &.shake {
        animation: shake 400ms cubic-bezier(0.165, 0.84, 0.44, 1);
    }

    @keyframes shake {
        0% { transform: rotate(0deg); box-shadow: 0px 0px 0px 0px ${({ theme }) => theme.color.purple['30']} }
        25% { transform: rotate(2deg); box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.color.purple['30']} }
        50% { transform: rotate(0deg); box-shadow: 0px 0px 0px 2px ${({ theme }) => theme.color.purple['30']} }
        75% { transform: rotate(-2deg); box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.color.purple['30']} }
        100% { transform: rotate(0deg); box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.color.purple['30']} }
    }

    &::before {
        content: "";
        position: absolute;
        inset: 1px;
        background-color: ${({ theme }) => theme.glass};
        border-radius: calc(0.5rem - 1px);
    }

    ${media('md')} {
        order: -1;       
        grid-column: span 4;
        padding: 2rem;
        border-radius: 1rem;
        border-width: 3px;

        &::before {
            border-radius: calc(1rem - 4px);
        }
    }
`;

const GlobeIllustration = styled(GlobeSVG)`
    position: absolute;
    bottom: -12.5rem;
    right: -15rem;
    width: 47.5rem;
    height: 47.5rem;
    color: ${({ theme }) => theme.on};
    z-index: -1;

     ${media('md')} {
        width: 86rem;
        height: 86rem;
        bottom: -30rem;
    }
`;

const TalkingPoints = styled.div`
    padding-top: 0.5rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    align-content: center;
    row-gap: 1.5rem;

    ${media('md')} {
        padding-top: 1rem;
    }

    & > div {
        flex: 0 1 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        gap: 1rem;
       
        ${media('sm')} {
            flex: 1 1 auto;
        }

        & svg {
            width: 2.5rem;
            height: 2.5rem;
            overflow: visible;
            rect {
                filter: drop-shadow(0px 55.65px 15.4px rgba(0, 0, 0, 0.01)) drop-shadow(0px 35.7px 14.35px rgba(0, 0, 0, 0.04)) drop-shadow(0px 19.95px 11.9px rgba(0, 0, 0, 0.14)) drop-shadow(0px 8.75px 8.75px rgba(0, 0, 0, 0.24)) drop-shadow(0px 2.1px 4.9px rgba(0, 0, 0, 0.27));
            }
        }

        & p {
            margin: 0;
            font-size: 0.875rem;
            line-height: 1.25rem;
            font-weight: 500;
            font-variation-settings: 'wght' 500;
        }
    }
`;

const SuccessOverlay = styled.div`
    position: absolute;
    inset: 0;
    padding: 1rem;
    background-color: ${({ theme }) => theme.surface};
    display: flex;
    flex-direction: column;
    border-radius: calc(1rem - 4px);
    ${media('md')} {
        padding: 2rem;
    }
`;

const SuccessContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > svg {
        color: ${({ theme }) => theme.color.green['80']};
    }

    & h4 {
        margin: 0;
        margin-top: 1rem;
        font-size: 1.125rem;
        line-height: 1.5rem;
    }

    & p {
        margin: 0;
        font-size: 0.875rem;
        line-height: 1.25rem;
    }
`; 

const Hero = () => {
    const [success, setSuccess] = useState(true);

    return (
        <Root>
            <Wrapper>
                <Content>
                    <Title>
                        <h1>
                            A Deep Dive Into Fennel
                        </h1>
                        <AuthorBlock
                            image="/images/Person=Nikhil.png"
                            name="Nikhil Garg"
                            subtext="Co-Founder & CEO · Fennel"
                        />
                    </Title>
                    <p>
                        Join Co-Founder / CEO Nikhil Garg for a live demo as we take a technical deep dive, and learn learn why Fennel is the hottest feature engineering platform out there. Join us to learn about:
                    </p>
                    <TalkingPoints>
                        <div>
                            <EmpowersSVG />
                            <p>Reducing dependency <br />on Engineering.</p>
                        </div>
                        <div>
                            <EngineSVG />
                            <p>High-Quality Data and <br />Feature Pipelines</p>
                        </div>
                        <div>
                            <ApproachSVG />
                            <p>Unified batch & real-time <br />computation engine.</p>
                        </div>
                    </TalkingPoints>
                </Content>
                <Form>
                    <OpenDemoRegistrationForm onSubmit={() => setSuccess(true)} />
                    {success ? (
                        <SuccessOverlay>
                            <SuccessContent>
                                <CheckCircleIcon width={40} height={40} />
                                <h4>Thanks for Registering!</h4>
                                <p>See you on August 6th</p>
                            </SuccessContent>
                            <Button variant='outline' shape="pill" ariaLabel="Add to your calendar" label="Add to Calendar" type="submit" />
                        </SuccessOverlay>
                    ) : null}
                </Form>
            </Wrapper>
            <GlobeIllustration />
        </Root>
    );
}

export default Hero;