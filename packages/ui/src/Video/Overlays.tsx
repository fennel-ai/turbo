import PlayButton from '../../icons/play-button.svg';
import { TitleBlock } from '../TitleBlock';
import { SubmittableInput } from '../Inputs';
import { Button } from '../Button';
import Link from 'next/link';
import { PillButton } from '../PillButton';
import { media } from 'styles/utils';
import styled from '@emotion/styled';
import { VIDEO_STATE, VideoActions, OverlayProps } from './Video.interface';


const PlayContentWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
`;

const PlayButtonWrapper = styled.div`
    height: 96px;
    width: 96px;
    background: #F0F0FFED;
    border-radius: 50%;
    display:flex;
    align-items: center;
    justify-content:center;
    cursor: pointer;
`;

const SubscribeForUpdatesActions = styled.div`
	margin-top: 2rem;
`;

const Overlay = styled.div<{notStarted: boolean}>`
    position: absolute;
    left: 0px;
    top: 0px;
    color: #FFF;
    background-color: rgba(27, 25, 36, 0.8);
    backdrop-filter: ${({ notStarted }) => notStarted ? 'blur(0px)' : 'blur(16px)'};
    width: 100%;
    height: 100%;
    transition: background-color 2s ease-in 1s;
`

const SubmittableInputSubText = styled.p`
        margin-top: 0.25rem !important;
        font-size: 0.8125rem !important;
        line-height: 1rem;
        color: ${({ theme }) => theme.on};
        opacity: 0.64;
`

const OverlaySectionWrapper = styled.div<{ section?: boolean, isFinished?:boolean }>`
    display:${({ section, isFinished }) => !!!section && isFinished ? 'none': 'flex'};
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    & p {
        max-width: 450px;
        font-size: 14px;
        line-height: 20px;
    }
    ${media('md')} {
		border-left: ${({ section }) => section ? '1px solid #F0F0FF14' : ''};
        display: flex;
	}

`
//   display: ${({ isFinished }) => !isFinished ? 'none': 'flex'}
const OverlayContentWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    height: 100%;
`

const SubscribeForUpdatesOverlay = ({ isFinished, onPlay }: {isFinished: boolean, onPlay: VideoActions["onPlay"]}) => {
    return (
        <OverlaySectionWrapper isFinished={isFinished}>
            <TitleBlock center>
                <h3>Subscribe For Updates</h3>
                <p>Join 1000+ others and receive product updates and articles by the Fennel team directly to your inbox.</p>
                <SubscribeForUpdatesActions>
                    <SubmittableInput placeholder={"Enter your email"} />
                    <SubmittableInputSubText>You can always unsubscribe at any time.</SubmittableInputSubText>
                </SubscribeForUpdatesActions>
                {!isFinished &&
                    <Button variant='ghost' label='Skip & Continue' color='neutral' onClick={onPlay} />
                }
            </TitleBlock>
        </OverlaySectionWrapper>
    )
}

const SalesDemoOverlay = () => {
    return (
        <OverlaySectionWrapper section>
            <TitleBlock center actions={[<Link href="https://fennel.ai/get-a-demo"><PillButton invert>Request A Demo</PillButton></Link>]}>
                <h3>Talk to Sales</h3>
                <p>Interested in using Fennel? Fill out the demo request form and sales will be in touch shortly to book a call with you and your team.</p>
            </TitleBlock>
        </OverlaySectionWrapper>
    )
}


const OverlayContentPlay = ({ onPlay }: {onPlay: VideoActions["onPlay"]}) => {
    return (
        <PlayContentWrapper>
            <PlayButtonWrapper onClick={onPlay}>
                <PlayButton />
            </PlayButtonWrapper>
        </PlayContentWrapper>
    )
}


const OverlayContentPause = ({ isFinished, onPlay }: {isFinished: boolean, onPlay: VideoActions["onPlay"]}) => {
    return (
            <OverlayContentWrapper>
                <SubscribeForUpdatesOverlay isFinished={isFinished} onPlay={onPlay} />
                {isFinished && <SalesDemoOverlay />}
            </OverlayContentWrapper>
    )
}

const OverlayContent = ({ state, onPlay }: {state: VIDEO_STATE, onPlay: VideoActions["onPlay"]}) => {
    switch (state) {
        case VIDEO_STATE.NOT_STARTED:
            return <OverlayContentPlay onPlay={onPlay} />;
        case VIDEO_STATE.PAUSED:
        case VIDEO_STATE.FINISHED:
            return <OverlayContentPause onPlay={onPlay} isFinished={state == VIDEO_STATE.FINISHED} />
    }
}


export const getVideoOverlay = ({ actions, state }: OverlayProps) => {
    return (
        <Overlay notStarted={state==VIDEO_STATE.NOT_STARTED}>
            <OverlayContent state={state} onPlay={actions.onPlay} />
        </Overlay>
    )
}