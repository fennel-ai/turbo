import { useTheme, type Theme } from "@emotion/react";
import styled from "@emotion/styled";

const Root = styled.svg<{ indeterminate: boolean }>`
    display: block;
    color: black;
    transform: ${({ indeterminate }) => `rotate(${indeterminate ? -180 : -90}deg)`};
    ${({ indeterminate }) => indeterminate ? `animation: 1.4s linear 0s infinite normal none running rotationAnimation;` : ""}

    @keyframes rotationAnimation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

const ProgressCircle = styled.circle<{ indeterminate: boolean; progress: number; }>`
    stroke-dasharray: ${({ indeterminate }) => indeterminate ? `80px, 200px` : `126.90`};
    stroke-dashoffset: ${({ indeterminate, progress }) => indeterminate ? `0` : `${126.90 * (1 - (progress / 100))}`};
    ${({ indeterminate }) => indeterminate ? `animation: strokeAnimation 1.4s ease-in-out infinite;` : ""};
    ${({ indeterminate }) => !indeterminate ? `transition: 200ms stroke-dasharray ease-out` : ""};

    @keyframes strokeAnimation {
        0% {
            stroke-dasharray: 1px, 200px;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 100px, 200px;
            stroke-dashoffset: -15px;
        }
        100% {
            stroke-dasharray: 100px, 200px;
            stroke-dashoffset: -125px;
        }
    }
`;

type SpinnerProps = {
    className?: string;
    /**
     * Flag for showing the track below the progress spinner.
     * Default is `true`
     */
    background?: boolean;
    /**
     * Number between 0-100 representing the percentage to be illustrated by the loader.
     * If undefined, the spinner will spin indeterminately.
     * Default is `undefined`
     */
    progress?: number;
    /**
     * Default is `24`
     */
    size?: number;
}

export const Spinner = ({ className, background = true, progress, size = 24 }: SpinnerProps) => {
    const indeterminate = typeof progress === 'undefined';
    const theme = useTheme();
    return (
        <Root className={className} indeterminate={indeterminate} viewBox="22 22 44 44" width={size} height={size}>
            {background ? <circle cx="44" cy="44" r="20.2" fill="none" stroke={theme.border} strokeWidth="4" strokeLinecap='round' /> : null}
            <ProgressCircle 
                progress={progress || 0}
                indeterminate={indeterminate}
                cx="44" 
                cy="44" 
                r="20.2" 
                fill="none" 
                strokeWidth="4" 
                strokeLinecap='round' 
            />
        </Root>
    );
};