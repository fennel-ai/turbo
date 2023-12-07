import { PropsWithChildren, useState, useCallback, cloneElement } from 'react';
import styled from '@emotion/styled';
import * as themes from 'styles';
import { ThemeProvider } from '@emotion/react';
import { VideoActions, VIDEO_STATE } from './Video.interface';
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });



type Props = {
    getOverlay?: ({actions, state}: {actions: VideoActions, state: VIDEO_STATE}) => JSX.Element;
    url: string;
}

const Root = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
`;

export const Video = (props: PropsWithChildren<Props>) => {
    const { url, getOverlay } = props;
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

    const actions = {
        onEnded,
        onPlay,
        onPause,
    }

    const isPlaying = videoState == VIDEO_STATE.PLAYING;
    const overlay = getOverlay?.({actions, state: videoState})
    return (
        <ThemeProvider theme={themes.dark}>
            <Root>
                {!isPlaying && overlay}
                <ReactPlayer url={url} width="100%" height="100%" playing={isPlaying} {...actions} controls/>
            </Root>
        </ThemeProvider>
    );
};

