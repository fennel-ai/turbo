import { PropsWithChildren, useState, useCallback, cloneElement } from 'react';
import styled from '@emotion/styled';
import * as themes from 'styles';
import { ThemeProvider } from '@emotion/react';
import ExpandIcon from '../../icons/expand-screen.svg';
import PlayIcon from '../../icons/play.svg'
import { VideoActions, VIDEO_STATE } from './Video.interface';
import dynamic from 'next/dynamic'



const ControlContainer = styled.div`
background: linear-gradient(to bottom, rgba(0,0,0,0) 0 80%, rgba(0,0,0,0.8) 100%);
position: absolute;
top: 0;
bottom: 0;
right: 0;
left: 0;
flex-direction: column;
z-index: 1;
display: flex;
justify-content: flex-end;
`

const Root = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
`;


const Seekbar = styled.input<{percentDone: number}>`
    width: 100%;
    &[type=range] {
        -webkit-appearance: none;
        appearance: none;
        background: transparent;
        cursor: pointer;

        &::-webkit-slider-runnable-track {
            background: rgba(${({ theme }) => theme.ref.purple[95]},0.24);
            height: 4px;
            background-image: linear-gradient(#fff, #fff);
            border-radius: 1rem;
            background-size: ${({ percentDone }) => percentDone}% 100%;
            background-repeat: no-repeat;
        }

        &::-moz-range-track {
            background: rgba(${({ theme }) => theme.ref.purple[95]},0.24);
            height: 4px;
            background-image: linear-gradient(#fff, #fff);
            border-radius: 1rem;
            background-size: ${({ percentDone }) => percentDone}% 100%;
            background-repeat: no-repeat;
        }
        
        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            margin-top: -6px; /* Centers thumb on the track */
            background: #fff;
            width: 16px;
            height:16px;
            border-radius: 50%;
         }
        
        &::-moz-range-thumb {
            border: none; /*Removes extra border that FF applies*/
            border-radius: 50%;
            background-color: #fff;
            width: 16px;
            height:16px;
        }
    }
`

const ControlsWrapper = styled.div`
    padding: 20px;
    color: white;
`

const PauseIcon = styled.div`
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0 1rem 0 0;
    transition: transform 0.25s ease-in;
    &:hover{
        transform: scale(1.05);
    }
`

const Duration = styled.div`
    font-weight: 500;
    font-size: 1rem;
    color: rgba(${({ theme }) => theme.ref.purple[95]},0.8);
`

const DurationBold = styled.span`
    color: rgba(${({ theme }) => theme.ref.purple[95]},1);
`


const LeftControl = styled.div`
    display: flex;
    align-items: center;
`

const UpperController = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const ExpandIconButton = styled(ExpandIcon)`
    cursor: pointer;
    transition: transform 0.25s ease-in;
    &:hover{
        transform: scale(1.05);
    }
`

const convertSecondsToReadableFormat = (seconds: number) => {
    const minutes = Math.floor(seconds/60);
    const lefoverSeconds = Math.floor(seconds%60);
    const showZero = (num: number) => Math.floor(num/10) === 0 ? '0' :''
    return `${showZero(minutes)}${minutes}:${showZero(lefoverSeconds)}${lefoverSeconds}`
}


export const PlayerControls = (props: any) => {
    return (
        <ThemeProvider theme={themes.dark}>
            <ControlContainer onClick={()=>props.videoState === VIDEO_STATE.PLAYING ? props.onPause() : props.onPlay()}>
                <ControlsWrapper>
                    <UpperController>
                        <LeftControl>
                            {props.videoState === VIDEO_STATE.PLAYING ?
                                <PauseIcon onClick={()=>props.onPause()}>
                                    &#9208;
                                </PauseIcon> :
                                <PlayIcon onClick={()=>props.onPlay()}></PlayIcon>
                            }
                            <Duration>
                                {convertSecondsToReadableFormat(props.currentSeek)} 
                                <DurationBold> / {convertSecondsToReadableFormat(props.duration)} </DurationBold>
                            </Duration>
                        </LeftControl>
                        <ExpandIconButton onClick={(e:Event)=>props.handleClickFullscreen(e)}/>
                    </UpperController>
                    
                <Seekbar
                    type="range"
                    min={0}
                    max={props.duration}
                    onClick={(e) => e.stopPropagation()}
                    onInput={(e) => props.handleSeek(e)}
                    percentDone={(props.currentSeek/props.duration)*100}
                    value={props.currentSeek} />
                </ControlsWrapper>
            </ControlContainer>
        </ThemeProvider>
    );
};
