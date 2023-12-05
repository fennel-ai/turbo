import { Container, Hero, Video } from "ui";
import { getVideoOverlay } from '../Overlays';
import styled from '@emotion/styled';
import { rgba } from "styles/utils";

const Root = styled.div`
    position: relative;
    margin-top: -12rem;
    z-index: 8;
    width: 100%;
    overflow: hidden;
    margin-bottom: 12rem;
`;

const GlassContainer = styled.div`
    width: 100%;
    border-radius: 24px;
    background: ${({ theme }) => rgba(theme.surface, 0.64)};
    border: 0.5px solid ${({ theme }) => theme.border.light};
    backdrop-filter: blur(1.5rem);
    height: 46.5rem;
    box-shadow: ${({ theme }) => `0px 2.26915px 1.54966px 0px ${rgba(theme.shadow, 0.01)}, 0px 5.45308px 3.72406px 0px ${rgba(theme.shadow, 0.01)}, 0px 10.26767px 7.01207px 0px ${rgba(theme.shadow, 0.01)}, 0px 18.31577px 12.50833px 0px ${rgba(theme.shadow, 0.02)}, 0px 34.25764px 23.39546px 0px ${rgba(theme.shadow, 0.02)}, 0px 82px 56px 0px ${rgba(theme.shadow, 0.03)}`};
`
const VideoContainer = styled.div`
    width: 100%;
    padding: 20px;
    height: 100%;
`


export const HeroComponent = () => {
    return (
        <div>
            <Hero title={"See Fennel in Action"} text={"Check out our introductory video below to learn more about what you can achieve with Fennel."} />
            <Root>
                <Container>
                    <GlassContainer>
                        <VideoContainer><Video url="https://www.youtube.com/watch?v=S8xk3E-Zvz4" getOverlay={getVideoOverlay} /></VideoContainer>
                    </GlassContainer>
                </Container>
            </Root>
        </div>
    );
};

export default HeroComponent;