import { useState, useCallback, cloneElement, useRef, forwardRef, useEffect } from 'react';
import styled from '@emotion/styled';
import * as themes from 'styles';
import { ThemeProvider } from '@emotion/react';
import { VideoActions, VIDEO_STATE } from './Video.interface';

import { PlayerControls } from './PlayerControls';
import dynamic from 'next/dynamic'
import { findDOMNode } from 'react-dom';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull'
const ForwardedReactPlayer = dynamic(() => import("./DynamicVideoPlayer"), { ssr: false });



type Props = {
    getOverlay?: ({actions, state}: {actions: VideoActions, state: VIDEO_STATE}) => JSX.Element;
    url: string;
    autoplay?: boolean;
    actions?: Partial<VideoActions>;
    forcePause?: boolean;
}

const Root = styled.div`
    background: black;
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.29), 0px 2.50666px 8.35552px rgba(0, 0, 0, 0.208468), 0px 1.34018px 4.46726px rgba(0, 0, 0, 0.172871), 0px 0.751293px 2.50431px rgba(0, 0, 0, 0.145), 0px 0.399006px 1.33002px rgba(0, 0, 0, 0.117129), 0px 0.166035px 0.553451px rgba(0, 0, 0, 0.0815322);
`;


export const Video = (props: Props) => {
    const { url, getOverlay, autoplay, forcePause, actions: cbActions } = props;
    const [videoState, setVideoState] = useState(autoplay ? VIDEO_STATE.PLAYING : VIDEO_STATE.NOT_STARTED);
    const [duration, setVideoDuration] = useState(0)
    const [currentSeek, setCurrentSeek] = useState(0)
    const [controlsVisible, setControlsVisible] = useState(false);
    const videoPlayerRef = useRef<ReactPlayer>(null)
    const videoContainerRef = useRef<HTMLDivElement>(null)

    const onPause = useCallback(() => {
        setVideoState(VIDEO_STATE.PAUSED)
        cbActions?.onPause?.();
    }, [setVideoState, cbActions])

    const onPlay = useCallback(() => {
        setVideoState(VIDEO_STATE.PLAYING)
        cbActions?.onPlay?.();
    }, [setVideoState, cbActions])

    const onEnded = useCallback(() => {
        setVideoState(VIDEO_STATE.FINISHED)
        cbActions?.onEnded?.();
    }, [setVideoState, cbActions])

    const onReady = () => {
        setVideoDuration(videoPlayerRef.current?.getDuration() || 0)
    }

    const onProgress = (e: any) => {
        setCurrentSeek(Math.floor(e.playedSeconds))
    }

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentSeek(Math.floor(parseInt(e.target.value)));
        videoPlayerRef.current?.seekTo(parseInt(e.target.value));
    }

    const handleClickFullscreen = (e: Event) => {
        e.stopPropagation();
        screenfull.request(findDOMNode(videoPlayerRef.current) as Element)
    }

    useEffect(() => {
        const onMouseLeave = () => {
            setControlsVisible(false)
        }
        const onMouseEnter = () => {
            setControlsVisible(true)
        }

        videoContainerRef.current?.addEventListener('mouseleave', onMouseLeave);
        videoContainerRef.current?.addEventListener('mouseenter', onMouseEnter);
         return () => {
            videoContainerRef.current?.removeEventListener('mouseleave', onMouseLeave);
            videoContainerRef.current?.removeEventListener('mouseenter', onMouseEnter);
         }
    })

    const actions = {
        onEnded,
        onPlay,
        onPause,
        onReady,
        onProgress,
    }

    const isPlaying = forcePause ? false : videoState == VIDEO_STATE.PLAYING;
    const overlay = getOverlay?.({actions, state: videoState})
    return (
        <ThemeProvider theme={themes.dark}>
            <Root ref={videoContainerRef}>
                {!isPlaying && overlay}
                <ForwardedReactPlayer
                    videoRef={videoPlayerRef}
                    url={url}
                    width="100%"
                    height="100%"
                    playing={isPlaying}
                    {...actions}
                />
                {controlsVisible && !(!isPlaying && overlay!=undefined) &&
                <PlayerControls 
                    duration={duration}
                    currentSeek={currentSeek}
                    handleSeek={handleSeek}
                    handleClickFullscreen={handleClickFullscreen}
                    videoState={videoState}
                    {...actions}
                />
            }
            </Root>
        </ThemeProvider>
    );
};

