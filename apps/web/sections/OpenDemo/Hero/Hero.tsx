import styled from '@emotion/styled';

import { media } from 'styles/utils';
import { Container } from 'ui';

import CalendarIcon from 'ui/icons/calendar.svg';

import AuthorBlock from 'components/AuthorBlock';

const Root = styled.div`
    position: relative;
    overflow: hidden;
    padding: 3rem 0 0 0;
	background-color: ${({ theme }) => theme.surface};

    ${media('md')} {
        padding: 5rem 0 0 0;
    }
`;

const Wrapper = styled(Container)`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
    padding: 4rem 0;
    gap: 2rem;
`;

const Content = styled.div`
    grid-column: span 12;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    ${media('md')} {
        grid-column: span 8;
    }

    & > p {
        margin: 0;
        font-size: 1rem;
        line-height: 1.5rem;
        font-weight: 500;
        font-variation-settings: 'wght' 500;
        max-width: 39.25rem;

        ${media('md')} {
            font-size: 1.5rem;
            line-height: 2rem;
        }
    }
`;

const DateLockup = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 0.5rem;
    opacity: 0.64;

    & svg {
        width: 1rem;
        height: 1rem;

        ${media('md')} {
            width: 1.25rem;
            height: 1.25rem;
        }
    }

    & p {
        margin: 0;
        font-size: 1rem;
        line-height: 1rem;
        
        ${media('md')} {
            font-size: 1.25rem;
            line-height: 1.5rem;
        }
    }
`;

const Title = styled.div`
    display: flex;
    flex-direction: column;

    h4 {
        font-size: 0.8125rem;
        line-height: 1rem;
        font-weight: 700;
        font-variation-settings: 'wght' 700;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        color: ${({ theme }) => theme.primary.accent};
        margin: 0;

        ${media('md')} {
            font-size: 1rem;
            line-height: 1.5rem;
        }
    }

    h1 {
        font-size: 2rem;
        line-height: 2.25rem;
        font-weight: 700;
        font-variation-settings: 'wght' 700;
        margin: 0.25rem 0 0.5rem 0;

        ${media('md')} {
            font-size: 3.5rem;
            line-height: 4rem;
        }
    }
`;

const Form = styled.div`
    grid-column: span 12;

    ${media('md')} {
        grid-column: span 3;
    }
`;

const Hero = () => {
    return (
        <Root>
            <Wrapper>
                <Content>
                    <Title>
                        <h4>
                            Monthly Live Open Demo
                        </h4>
                        <h1>
                            A Deep Dive Into Fennel
                        </h1>
                        <DateLockup>
                            <CalendarIcon />
                            <p>Aug 6th 2024 · 9AM PST</p>
                        </DateLockup>
                    </Title>
                    <p>
                        Join Co-Founder / CEO Nikhil Garg for a live demo. Take a technical deep dive, and learn learn why Fennel is the hottest feature engineering platform out there.
                    </p>
                    <AuthorBlock
                        image="/images/Person=Nikhil.png"
                        name="Nikhil Garg"
                        subtext="Co-Founder & CEO · Fennel"
                    />
                </Content>
                <Form>
                    Form
                </Form>
            </Wrapper>
        </Root>
    );
};

export default Hero;