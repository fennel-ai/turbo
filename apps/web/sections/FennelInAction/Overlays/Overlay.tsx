import PlayButton from 'ui/icons/play-button.svg';
import { TitleBlock, Button, SubscribeToNewsletter, PillButton, VIDEO_STATE } from 'ui';
import Link from 'next/link';
import { media } from 'styles/utils';
import styled from '@emotion/styled';
import type { VideoActions, OverlayProps } from 'ui';

interface FennelDemoOverlayProps extends OverlayProps {
    showSubscribeCTA: boolean;
    onSubscribe: () => void;
}

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
    &:hover {
        box-shadow: 0px 91px 114px rgba(105, 88, 202, 0.2), 0px 38.0176px 47.6265px rgba(105, 88, 202, 0.1), 0px 20.326px 25.4634px rgba(105, 88, 202, 0.12), 0px 11.3946px 14.2746px rgba(105, 88, 202,  0.1), 0px 6.05159px 7.58112px rgba(105, 88, 202, 0.08), 0px 2.5182px 3.15467px rgba(105, 88, 202, 0.06), 0px 0px 0px 1px #FFFFFF;
    }
`;

const SubscribeForUpdatesActions = styled.div`
	margin-top: 2rem;
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

const SubscribeForUpdatesOverlay = ({ isFinished, onPlay, onSubscribe }: {isFinished: boolean, onPlay: VideoActions["onPlay"], onSubscribe: () => void;}) => {
    return (
        <OverlaySectionWrapper isFinished={isFinished}>
            <TitleBlock center>
                <h3>Subscribe For Updates</h3>
                <p>Join 1000+ others and receive product updates and articles by the Fennel team directly to your inbox.</p>
                <SubscribeForUpdatesActions>
                    <SubscribeToNewsletter onSubscribe={onSubscribe}/>
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
        <OverlaySectionWrapper fixedSection>
            <TitleBlock center actions={[<Link href="https://fennel.ai/get-a-demo"><PillButton invert>Request A Demo</PillButton></Link>]}>
                <h3>Talk to Sales</h3>
                <p>Interested in using Fennel? Fill out the demo request form and sales will be in touch shortly to book a call with you and your team.</p>
            </TitleBlock>
        </OverlaySectionWrapper>
    )
}


const OverlayContentPlay = ({ onPlay }: {onPlay: VideoActions["onPlay"]}) => {
    return (
        <Overlay notStarted onClick={onPlay}>
        <PlayContentWrapper>
            <PlayButtonWrapper>
                <PlayButton />
            </PlayButtonWrapper>
        </PlayContentWrapper>
        </Overlay>
    )
}

const OverlayContentPause = ({ isFinished, onPlay, showSubscribeCTA, onSubscribe }: {isFinished: boolean, onPlay: VideoActions["onPlay"], showSubscribeCTA: boolean, onSubscribe: () => void}) => {
    return (
        !(!showSubscribeCTA && !isFinished) &&
        <Overlay>
            <OverlayContentWrapper>
                {showSubscribeCTA && <SubscribeForUpdatesOverlay isFinished={isFinished} onPlay={onPlay} onSubscribe={onSubscribe}/>}
                {isFinished && <SalesDemoOverlay />}
            </OverlayContentWrapper>
        </Overlay>
    )
}

export const getFennelDemoOverlay = ({ actions, state, showSubscribeCTA, onSubscribe }: FennelDemoOverlayProps) => {
    switch (state) {
        case VIDEO_STATE.NOT_STARTED:
            return <OverlayContentPlay onPlay={actions.onPlay} />;
        case VIDEO_STATE.PAUSED:
        case VIDEO_STATE.FINISHED:
            return <OverlayContentPause onPlay={actions.onPlay} isFinished={state == VIDEO_STATE.FINISHED} showSubscribeCTA={showSubscribeCTA} onSubscribe={onSubscribe} />
        default:
            return<></>
    }
}
