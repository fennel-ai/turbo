


import { Container } from "ui";
import styled from '@emotion/styled';
import PlayButton from 'ui/icons/play.svg';
import { media, rgba } from "styles/utils";
import { useTheme } from "@emotion/react";
import Image from "next/image";
import ReactModal from 'react-modal';
import { useEffect, useRef, useState } from "react";
import { HeroVideo } from "sections/Index/HeroVideo";

const Root = styled.div<{ showMask: boolean }>`
    position: relative;
    margin-top: -5rem;
    z-index: 8;
    height: 14rem;
    width: 100%;
    overflow: hidden;
    mask: ${({ showMask }) => showMask ? `linear-gradient(180deg, black, black, transparent)` : ''};
    --webkit-mask:  ${({ showMask }) => showMask ? `linear-gradient(180deg, black, black, transparent)`: ''};

    ${media('2xs')} {
        height: 18rem;
    }

    ${media('xs')} {
        height: 30rem;
        margin-top: -6rem;
    }

    ${media('sm')} {
        height: 35rem;
        margin-top: -12rem;
    }

`;

const GlassContainer = styled.div`
    width: 100%;
    position: relative;
    border-radius: 0.5rem;
    background: ${({ theme }) => rgba(theme.surface, 0.64)};
    border: 0.5px solid ${({ theme }) => theme.border};
    height: 46.5rem;
    backdrop-filter: blur(1.5rem);
    box-shadow: ${({ theme }) => `0px 2.26915px 1.54966px 0px ${rgba(theme.shadow, 0.01)}, 0px 5.45308px 3.72406px 0px ${rgba(theme.shadow, 0.01)}, 0px 10.26767px 7.01207px 0px ${rgba(theme.shadow, 0.01)}, 0px 18.31577px 12.50833px 0px ${rgba(theme.shadow, 0.02)}, 0px 34.25764px 23.39546px 0px ${rgba(theme.shadow, 0.02)}, 0px 82px 56px 0px ${rgba(theme.shadow, 0.03)}`};
    
    ${media('sm')} {
        border-radius: 1.5rem;
    }
`

const ButtonContainer = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    z-index: 1;
`

const ImageContainer = styled.div`
    mask: linear-gradient(to top, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 1) 72%)
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    border-radius: 1.5rem;
    backdrop-filter: blur(1rem);

    & img {
        width: 100%;
        height: auto;
    }
`

const PlayButtonWrapper = styled.div`
    height: 3rem;
    width: 3rem;
    background: ${({ theme }) => `rgb(${theme.ref.purple['90']})`};
    border-radius: 50%;
    display:flex;
    box-shadow: 0px 38.0176px 47.6265px rgba(105, 88, 202, 0.079074), 0px 20.326px 25.4634px rgba(105, 88, 202, 0.0655718), 0px 11.3946px 14.2746px rgba(105, 88, 202, 0.055), 0px 6.05159px 7.58112px rgba(105, 88, 202, 0.0444282), 0px 2.5182px 3.15467px rgba(105, 88, 202, 0.030926), 0px 0px 0px 2px #5D4CBE;
    backdrop-filter: blur(6px);
    align-items: center;
    justify-content:center;
    cursor: pointer;
    transition: box-shadow 0.5s ease-in, transform 0.5s ease-in;
    &:hover {
        transform: scale(1.05);
        box-shadow: 0px 91px 114px rgba(105, 88, 202, 0.2), 0px 38.0176px 47.6265px rgba(105, 88, 202, 0.1), 0px 20.326px 25.4634px rgba(105, 88, 202, 0.12), 0px 11.3946px 14.2746px rgba(105, 88, 202,  0.1), 0px 6.05159px 7.58112px rgba(105, 88, 202, 0.08), 0px 2.5182px 3.15467px rgba(105, 88, 202, 0.06);
    }
    & svg {
        width: 1rem;
        height: 1rem;
        & path {
            fill: white;
        }
    }

    ${media('xs')} {
        width: 4rem;
        height: 4rem;
        & svg {
            width: 1.5rem;
            height: 1.5rem;
        }
    }

    ${media('sm')} {
        width: 6rem;
        height: 6rem;
        & svg {
            width: 2rem;
            height: 2rem;
        }
    }
`;

const CustomPaddedContainer = styled.div`
    max-width: 86.5rem;
    width: 100%;
    margin: 0 auto;
    padding-left: 0.5rem;
    padding-right: 0.5rem;

    ${media('2xs')} {
        padding-left: 1rem;
        padding-right: 1rem;
    }

    ${media('md')} {
        padding-left: 3rem;
        padding-right: 3rem;
    }
`

const SeeItInAction = () => {
    const theme = useTheme();
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
    const [allowExit, setAllowExit] = useState(false)
    const sectionRef = useRef<HTMLDivElement>(null)
    const [overlayRefState, setOverlayRefState] = useState<HTMLDivElement | null>(null)
    const [contentRefState, setContentRefState] = useState<HTMLDivElement | null>(null)
    const modalStyles = {
    overlay: {
        zIndex: 10,
        background: 'rgba(0,0,0,0.8)'
    }, 
    content: {
        padding: '0px',
        background: theme.glass,
        borderColor: 'transparent',
        backdropFilter: 'blur(16px)'
    }};

    const actions = {
        onPlay: ()=> {
            setAllowExit(false)
        },
        onPause: ()=> {
            setAllowExit(true)
        },
        onEnded: ()=>{
            setAllowExit(true)
        },
    }

    const getOverlayRef = (ref: HTMLDivElement) => {
        setOverlayRefState(ref)
    };

    const getContentRef = (ref: HTMLDivElement) => setContentRefState(ref);

    useEffect(() => {
        const handleClick = (e: Event) => {
            if(!contentRefState?.contains(e.target as Node)) {

                if(allowExit) {
                    setIsVideoModalOpen(false)
                    setAllowExit(false)
                } else {
                    setAllowExit(true)
                }
            }
        }
        const onPressEsc = (e: KeyboardEvent) => {
            if (e.key == "Escape") {
                if(allowExit) {
                    setIsVideoModalOpen(false)
                    setAllowExit(false)
                } else {
                    setAllowExit(true)
                }
            }
        }

        overlayRefState?.addEventListener('click', handleClick);
        overlayRefState?.addEventListener("keydown", onPressEsc);
        return () => {
            overlayRefState?.removeEventListener('click', handleClick);
            overlayRefState?.removeEventListener("keydown", onPressEsc);
        }
    }, [overlayRefState, contentRefState, allowExit])

    return (
        <Root ref={sectionRef} showMask={!isVideoModalOpen}>
            <ButtonContainer>
                <PlayButtonWrapper onClick={()=>{
                    setIsVideoModalOpen(true)
                }}>
                    <PlayButton/>
                </PlayButtonWrapper>
            </ButtonContainer>
            <CustomPaddedContainer>
                <GlassContainer>
                    <ImageContainer>
                        <Image src={theme.type === 'dark' ? "/images/console_dark.png" : "/images/console_light.png"} alt="Fenel Console Dashboard" width={1286} height={743} />
                    </ImageContainer>
                    <ReactModal 
                        style={modalStyles}
                        isOpen={isVideoModalOpen}
                        className={'seeItInActionContent'}
                        contentLabel="Fennel Demo"
                        onRequestClose={()=>setIsVideoModalOpen(false)}
                        overlayRef={getOverlayRef}
                        contentRef={getContentRef}
                        shouldCloseOnOverlayClick={false}
                        shouldCloseOnEsc={false}
                        shouldFocusAfterRender={false}
                    >
                        <HeroVideo actions={actions} forcePause={allowExit} onClose={()=>{
                            setIsVideoModalOpen(false)
                            setAllowExit(false)
                        }}/>
                    </ReactModal>
                </GlassContainer>
            </CustomPaddedContainer>
        </Root>
    );
};

export default SeeItInAction;