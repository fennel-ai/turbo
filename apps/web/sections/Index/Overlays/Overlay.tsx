import { TitleBlock, Button, SubscribeToNewsletter, PillButton, VIDEO_STATE } from 'ui';
import Link from 'next/link';
import { media } from 'styles/utils';
import styled from '@emotion/styled';
import type { VideoActions, OverlayProps } from 'ui';
import PlayIcon from 'ui/icons/play.svg';
import Close from 'ui/icons/close.svg';
import ArrowUpRightIcon from 'ui/icons/arrow-narrow-up-right.svg';

interface FennelDemoOverlayProps extends OverlayProps {
    showSubscribeCTA: boolean;
    onSubscribe: () => void;
    onClose?: () => void;
}

const SubscribeForUpdatesActions = styled.div`
	margin-top: 0.5rem;
    width: 15rem;
    ${media('md')} {
		width: 25rem;
	}
    
`;

const Overlay = styled.div<{notStarted?: boolean}>`
    position: absolute;
    left: 0px;
    top: 0px;
    color: #FFF;
    background-color: rgba(27, 25, 36, 0.8);
    backdrop-filter: ${({ notStarted }) => notStarted ? 'blur(0px)' : 'blur(16px)'};
    width: 100%;
    height: 100%;
    transition: background-color 2s ease-in;
`

const OverlaySectionWrapper = styled.div<{ fixedSection?: boolean, isFinished?:boolean}>`
    display:${({ fixedSection, isFinished }) => (!!!fixedSection && isFinished) ? 'none': 'flex'};
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
		border-left: ${({ fixedSection }) => fixedSection ? '1px solid #F0F0FF14' : ''};
        display: flex;
	}

`
//   display: ${({ isFinished }) => !isFinished ? 'none': 'flex'}
const OverlayContentWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    height: 100%;
`

const PlayInstructionWrapper = styled.div`
    color: ${({ theme }) => theme.on_alt};
    position: absolute;
    font-size: 0.875rem;
    bottom: 2rem;
    display: flex;
    cursor: pointer;
    align-items: center;
`


const CloseVideoInstruction = styled.div`
    position: absolute;
    top: 1.5rem;
    right: 1rem;
    ${media('sm')} {
        right: 1.5rem;
	}
`

const PlayIconWrapper = styled.div`
    padding-right: 10px;
    margin-top:4px;
    opacity: 0.8;
`


const PlayInstruction = () => {
    return (
        <PlayInstructionWrapper>
            <PlayIconWrapper><PlayIcon/></PlayIconWrapper>
            Click anywhere to resume
        </PlayInstructionWrapper>
    )
}

const SubscribeForUpdatesOverlay = ({ isFinished, onPlay, onSubscribe }: {isFinished: boolean, onPlay: VideoActions["onPlay"], onSubscribe: () => void;}) => {
    return (
        <OverlaySectionWrapper isFinished={isFinished} onClick={() => !isFinished ? onPlay() : {}}>
            <TitleBlock center>
                <h3>Get Notified Of<br/>Our Product Updates</h3>
                <SubscribeForUpdatesActions>
                    <SubscribeToNewsletter onSubscribe={onSubscribe} fill/>
                </SubscribeForUpdatesActions>
            </TitleBlock>
            {!isFinished && <PlayInstruction/>}
        </OverlaySectionWrapper>
    )
}


const ThankYouForSubscribingCTA = ({onPlay, isFinished}: {onPlay: VideoActions["onPlay"], isFinished: boolean}) => {
    return( <OverlaySectionWrapper onClick={() => !isFinished ? onPlay() : {}}>
        <TitleBlock center actions={[<Link href="https://fennel.ai/get-a-demo"><Button variant='flat' color='primary' label='Request A Demo' icon={<ArrowUpRightIcon/>} shape='pill'></Button></Link>]}>
        <h3>Thanks for Subscribing</h3>
        <p>Click the button below to request a demo with the team, and see first-hand how Fennel can revolutionize your ML Ops </p>
        </TitleBlock>     
        {!isFinished && <PlayInstruction/>}
    </OverlaySectionWrapper>
    )
}

const OverlayContentPause = ({ isFinished, onPlay, showSubscribeCTA, onSubscribe, onClose }: {isFinished: boolean, onPlay: VideoActions["onPlay"], showSubscribeCTA: boolean, onSubscribe: FennelDemoOverlayProps['onSubscribe'], onClose?: FennelDemoOverlayProps['onClose']}) => {
    return (
        <Overlay>
            <CloseVideoInstruction>
                <Button icon={<Close/>} label="Close Video" variant='glass' shape='pill' direction='row-reverse' onClick={onClose} size='small'/>
            </CloseVideoInstruction>
            <OverlayContentWrapper>
                {showSubscribeCTA && <SubscribeForUpdatesOverlay isFinished={isFinished} onPlay={onPlay} onSubscribe={onSubscribe}/>}
                {!showSubscribeCTA && <ThankYouForSubscribingCTA isFinished={isFinished} onPlay={onPlay}/>}
                {/* {isFinished && <SalesDemoOverlay />} */}
            </OverlayContentWrapper>
        </Overlay>
    )
}

export const getFennelDemoOverlay = ({ actions, state, showSubscribeCTA, onSubscribe, onClose }: FennelDemoOverlayProps) => {
    switch (state) {
        case VIDEO_STATE.PAUSED:
        case VIDEO_STATE.FINISHED:
            return <OverlayContentPause onPlay={actions.onPlay} isFinished={state == VIDEO_STATE.FINISHED} showSubscribeCTA={showSubscribeCTA} onSubscribe={onSubscribe} onClose={onClose}/>
        default:
            return<></>
    }
}
