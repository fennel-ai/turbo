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
import { media } from 'styles/utils';
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
    overflow: hidden;
    border-radius: 1rem;
    box-shadow: 0px 0.166px 0.553px 0px rgba(0, 0, 0, 0.08), 0px 0.399px 1.33px 0px rgba(0, 0, 0, 0.12), 0px 0.751px 2.504px 0px rgba(0, 0, 0, 0.14), 0px 1.34px 4.467px 0px rgba(0, 0, 0, 0.17), 0px 2.507px 8.356px 0px rgba(0, 0, 0, 0.21), 0px 6px 20px 0px rgba(0, 0, 0, 0.29);
    ${media('xs')} {
        padding: 0.5rem;
    }
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

