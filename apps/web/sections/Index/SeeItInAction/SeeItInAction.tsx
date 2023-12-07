


import { Button, Container } from "ui";
import styled from '@emotion/styled';
import Link from "next/link";
import PlayCircle from 'ui/icons/play-circle.svg';
import { media, rgba } from "styles/utils";
import { useTheme } from "@emotion/react";
import Image from "next/image";

const Root = styled.div`
    position: relative;
    margin-top: -12rem;
    z-index: 8;
    height: 25rem;
    width: 100%;
    overflow: hidden;
    mask: linear-gradient(180deg, black, black, transparent);
    --webkit-mask: linear-gradient(180deg, black, black, transparent);

    ${media('sm')} {
        height: 35rem;
    }
`;

const GlassContainer = styled.div`
    width: 100%;
    border-radius: 24px;
    background: ${({ theme }) => rgba(theme.surface, 0.64)};
    border: 0.5px solid ${({ theme }) => theme.border.light};
    height: 46.5rem;
    backdrop-filter: blur(1.5rem);
    box-shadow: ${({ theme }) => `0px 2.26915px 1.54966px 0px ${rgba(theme.shadow, 0.01)}, 0px 5.45308px 3.72406px 0px ${rgba(theme.shadow, 0.01)}, 0px 10.26767px 7.01207px 0px ${rgba(theme.shadow, 0.01)}, 0px 18.31577px 12.50833px 0px ${rgba(theme.shadow, 0.02)}, 0px 34.25764px 23.39546px 0px ${rgba(theme.shadow, 0.02)}, 0px 82px 56px 0px ${rgba(theme.shadow, 0.03)}`};
`

const ButtonContainer = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50%;
    width: 100%;
    z-index: 1;
`

const ImageContainer = styled.div`
    background: ${({ theme }) => `linear-gradient(180deg, ${theme.background}, ${rgba(theme.background, 0.1)} 10%, ${rgba(theme.background, 0)} 15%)`};
    --webkit-mask-image: linear-gradient(to top, rgba(0, 0, 0, 0) 32%, rgba(0, 0, 0, 1) 100%);
    mask:linear-gradient(to top, rgba(0, 0, 0, 0) 32%, rgba(0, 0, 0, 1) 100%);
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    border-radius: 1.5rem;
    filter:  ${({ theme }) => `drop-shadow(0px -100px 217px ${rgba(theme.shadow, theme.type === 'dark' ? 0.32 : 0.08)})`};
`

const SeeItInAction = () => {
    const theme = useTheme();
    return (
        <Root>
            <Container>
                <GlassContainer>
                    <ButtonContainer>
                        <Link href="/fennel-in-action">
                            <Button variant='hero' icon={<PlayCircle />} color='neutral' label='See Fennel In Action' direction='row-reverse' shape='pill' />
                        </Link>
                    </ButtonContainer>
                    <ImageContainer>
                        <Image src={theme.type === 'dark' ? "/images/video_hero_dark.png" : "/images/video_hero.png"} alt="Fenel Console Dashboard" width={1286} height={743} />
                    </ImageContainer>
                </GlassContainer>
            </Container>
        </Root>
    );
};

export default SeeItInAction;