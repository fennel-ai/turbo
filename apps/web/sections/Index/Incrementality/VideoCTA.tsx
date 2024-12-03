import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import ReactModal from "react-modal";
import { motion } from 'framer-motion';
import { rgba } from "styles/utils";
import { Button } from "ui";

import PlayCircleIcon from 'ui/icons/play-circle.svg';
import { HeroVideo } from "sections/Index/HeroVideo";

const Root = styled(motion.div)`
    height: 19rem;
    background-color: ${({ theme }) => theme.background};
    border-radius: 0.5rem; 
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
`;

const Illustration = styled.div`
    position: absolute;
    inset: 0;
    z-index: 1;
`;

const ImageCard = styled(motion.div)`
    border-radius: 0.375rem;
    transform-origin: center center;
`;

const ConsoleCard = styled(ImageCard)`
    background-color: ${({ theme }) => theme.surface};
    width: 32rem;
    height: 18rem;
    aspect-ratio: 16/9;
    box-shadow: 0px 0px 0px 0.5px ${({ theme }) => rgba(theme.on, 0.08)}, 0px 4px 10px -2.5px ${({ theme }) => rgba(theme.on_alt, 0.18)};
    position: absolute;
    top: 5.5rem;
    left: 2rem;
`;

const EditorCard = styled(ImageCard)`
    background-color: ${({ theme }) => rgba(theme.surface, 0.83)};
    width: 34rem;
    height: 23.5rem;
    backdrop-filter: blur(0.75rem);
    box-shadow: 0px 0px 0px 0.5px ${({ theme }) => rgba(theme.on, 0.08)}, 0px 281px 112px ${({ theme }) => rgba(theme.on, 0.01)}, 0px 158px 95px ${({ theme }) => rgba(theme.on, 0.05)}, 0px 70px 70px ${({ theme }) => rgba(theme.on, 0.09)}, 0px 18px 39px ${({ theme }) => rgba(theme.on, 0.01)};
    position: absolute;
    top: 2rem;
    left: 13rem;
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 15rem;
    width: 31rem;
    z-index: 2;
    background-image: ${({ theme }) => `radial-gradient(42.67% 42.67% at 50% 50%, ${theme.surface} 20%, ${rgba(theme.surface, 0)} 100%)`};
`;

const variants = {
    console: {
        default: {
            scale: 1,
        },
        hover: {
            rotate: -2.5,
            x: -8
        }
    },
    editor: {
        default: {},
        hover: {
            rotate: 3,
            x: 64,
            y: 16
        }
    },
}

const transition = {
    type: 'spring',
    duration: 0.2,
    bounce: 0.3
}

function VideoCTA() {
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
        }
    };

    const actions = {
        onPlay: () => {
            setAllowExit(false)
        },
        onPause: () => {
            setAllowExit(true)
        },
        onEnded: () => {
            setAllowExit(true)
        },
    }

    const getOverlayRef = (ref: HTMLDivElement) => {
        setOverlayRefState(ref)
    };

    const getContentRef = (ref: HTMLDivElement) => setContentRefState(ref);

    useEffect(() => {
        const handleClick = (e: Event) => {
            if (!contentRefState?.contains(e.target as Node)) {

                if (allowExit) {
                    setIsVideoModalOpen(false)
                    setAllowExit(false)
                } else {
                    setAllowExit(true)
                }
            }
        }
        const onPressEsc = (e: KeyboardEvent) => {
            if (e.key == "Escape") {
                if (allowExit) {
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
        <>
            <Root initial="default" whileHover="hover">
                <Illustration>
                    <ConsoleCard variants={variants.console}></ConsoleCard>
                    <EditorCard variants={variants.editor}></EditorCard>
                </Illustration>
                <ButtonWrapper>
                    <Button onClick={() => setIsVideoModalOpen(true)} direction="row-reverse" icon={<PlayCircleIcon />} color="primary" label="Watch 3 min. Demo" />
                </ButtonWrapper>
            </Root>
            <ReactModal
                style={modalStyles}
                isOpen={isVideoModalOpen}
                className={'seeItInActionContent'}
                contentLabel="Fennel Demo"
                onRequestClose={() => setIsVideoModalOpen(false)}
                overlayRef={getOverlayRef}
                contentRef={getContentRef}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}
                shouldFocusAfterRender={false}
            >
                <HeroVideo actions={actions} forcePause={allowExit} onClose={() => {
                    setIsVideoModalOpen(false)
                    setAllowExit(false)
                }} />
            </ReactModal>
        </>
    );
}

export default VideoCTA 