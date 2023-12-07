import { Video } from "ui";
import { getFennelDemoOverlay } from '../Overlays';
import styled from '@emotion/styled';
import { useState } from "react";

const VideoContainer = styled.div`
    width: 100%;
    padding: 20px;
    height: 100%;
`


export const HeroVideo = () => {
    const [showSubscribeCTA, setShowSubscribeCTA] = useState(true);
    return (
        <VideoContainer>
            <Video url="https://www.youtube.com/watch?v=S8xk3E-Zvz4" getOverlay={({actions, state}) => getFennelDemoOverlay({actions, state, onSubscribe: () => setShowSubscribeCTA(false), showSubscribeCTA})} />
        </VideoContainer>
    );
};

export default HeroVideo;