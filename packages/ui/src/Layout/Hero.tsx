import styled from '@emotion/styled';
import { TitleBlock } from '../TitleBlock';
import { Button } from '../Button';

import ArrowNarrowUpRightIcon from '../../icons/arrow-narrow-up-right.svg';
import { media } from 'styles/utils';

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: ${({ theme }) => theme.glass};
    border-bottom: 0.5px solid ${({ theme }) => theme.border.light};
    overflow: hidden;
    min-height: 43rem;
    padding-top: 10rem;
    padding-bottom: 15rem;
    transform: translateZ(0);

    &::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: calc(100% - 10rem);
        height: 35.75rem;
        border-radius: 20.5rem;
        background: linear-gradient(137deg, #6958CA 10.53%, #E883CA 43.4%, #F8AC66 87.15%);
        filter: blur(52px);
        opacity: 0.12;
        pointer-events: none;
        user-select: none;
        z-index: -1;
    }
`;

const Wrapper = styled.div`
    padding: 0;
    margin: 0 auto;
    color: ${({ theme }) => theme.on_alt};;

    ${media('md')} {
        max-width: 53.5rem;
	}
`;

const IntroText = styled.p`
	padding: 0;
	color: ${({ theme }) => theme.on_alt};

	${media('sm')} {
        padding-left: 2.5rem;
        padding-right: 2.5rem;
	}
	
	${media('md')} {
        padding-left: 7.5rem;
        padding-right: 7.5rem;
	}
`;

export const Hero = () => {
    return <Root>
        <Wrapper>
            <TitleBlock 
                actions={[<Button color="primary" shape="pill" label="Read the Documentation" icon={<ArrowNarrowUpRightIcon />} />]} 
                center
            >
                <h1>Realtime Feature Platform. Beautifully Built.</h1>
                <IntroText>Fennel helps you author, compute, store, serve, monitor & govern both realtime and batch ML features.</IntroText>
            </TitleBlock>
        </Wrapper>
    </Root>
}