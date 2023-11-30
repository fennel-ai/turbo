import { PropsWithChildren, StyleHTMLAttributes, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { media } from 'styles/utils';
import ReactPlayer from 'react-player'
import PlayButton from '../../icons/play-button.svg';
import { TitleBlock } from '../TitleBlock';
import * as themes from 'styles';
import { ThemeProvider } from '@emotion/react';
import { SubmittableInput } from '../Inputs';
import { Button } from '../Button';
import Link from 'next/link';
import { PillButton } from '../PillButton';


type Props = {
    actions?: JSX.Element[];
    center?: boolean;
    className?: string;
    style?: StyleHTMLAttributes<HTMLDivElement>;
    url: string;
}

const Root = styled.div`
    position: relative;
    display: flex;
    width: 100%;
`;

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

const Overlay = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    font-family: Helvetica;
    color: #FFF;
    background-color: rgba(27, 25, 36, 0.8);
    backdrop-filter: blur(16px);
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

const OverlaySectionWrapper = styled.div<{ section?: boolean }>`
    display:flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    border-left: ${({ section }) => section ? '1px solid #F0F0FF14' : ''};
    & p {
        max-width: 450px;
        font-size: 14px;
        line-height: 20px;
    }
`

const OverlayContentWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    height: 100%;
`


const VIDEO_STATE = {
    NOT_STARTED: -1,
    PLAYING: 1,
    PAUSED: 0,
    FINISHED: 2,
}

const SubscribeForUpdatesOverlay = ({ isFinished, onPlay }) => {
    return (
        <OverlaySectionWrapper>
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


const OverlayContentPlay = ({ onPlay }: any) => {
    return (
        <PlayContentWrapper>
            <PlayButtonWrapper onClick={onPlay}>
                <PlayButton />
            </PlayButtonWrapper>
        </PlayContentWrapper>
    )
}


const OverlayContentPause = ({ isFinished, onPlay }: any) => {
    return (
        <>
            <OverlayContentWrapper>
                <SubscribeForUpdatesOverlay isFinished={isFinished} onPlay={onPlay} />
                {isFinished && <SalesDemoOverlay />}
            </OverlayContentWrapper>
        </>
    )
}

const OverlayContent = ({ videoState, onPlay }: any) => {
    console.log
    switch (videoState) {
        case VIDEO_STATE.NOT_STARTED:
            return <OverlayContentPlay onPlay={onPlay} />;
        case VIDEO_STATE.PAUSED:
        case VIDEO_STATE.FINISHED:
            return <OverlayContentPause onPlay={onPlay} isFinished={videoState == VIDEO_STATE.FINISHED} />
    }
}


const VideoOverlay = ({ onPlay, videoState }: any) => {
    return (
        <Overlay>
            <OverlayContent videoState={videoState} onPlay={onPlay} />
        </Overlay>
    )
}

export const Video = (props: PropsWithChildren<Props>) => {
    const { actions, center = false, children, className, style, url } = props;
    const [videoState, setVideoState] = useState(VIDEO_STATE.NOT_STARTED);

    const onPause = useCallback(() => {
        setVideoState(VIDEO_STATE.PAUSED)
    }, [setVideoState])

    const onPlay = useCallback(() => {
        setVideoState(VIDEO_STATE.PLAYING)
    }, [setVideoState])

    const onEnded = useCallback(() => {
        setVideoState(VIDEO_STATE.FINISHED)
    }, [setVideoState])

    const isPlaying = videoState == VIDEO_STATE.PLAYING;

    return (
        <ThemeProvider theme={themes.dark}>
            <Root>
                {!isPlaying && <VideoOverlay onPlay={onPlay} videoState={videoState} ></VideoOverlay>}
                <ReactPlayer url={url} onPause={onPause} width="100%" height="100%" playing={isPlaying} onEnded={onEnded} onPlay={onPlay} />
            </Root>
        </ThemeProvider>
    );
};

