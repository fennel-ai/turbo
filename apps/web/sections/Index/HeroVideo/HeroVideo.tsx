import { Video, VideoActions } from "ui";
import { getFennelDemoOverlay } from '../Overlays';
import styled from '@emotion/styled';
import { useState } from "react";

const VideoContainer = styled.div`
    width: 100%;
    padding: 10px;
    height: 100%;
`


export const HeroVideo = ({actions, forcePause, onClose}: {actions:VideoActions, forcePause?: boolean, onClose: ()=>void}) => {
    const [showSubscribeCTA, setShowSubscribeCTA] = useState(true);
    return (
        <VideoContainer>
            <Video url="https://www.youtube.com/watch?v=S8xk3E-Zvz4" getOverlay={({actions, state}) => getFennelDemoOverlay({actions, state, onSubscribe: () => setShowSubscribeCTA(false), showSubscribeCTA, onClose})} autoplay actions={actions} forcePause={forcePause}/>
        </VideoContainer>
    );
};

export default HeroVideo;