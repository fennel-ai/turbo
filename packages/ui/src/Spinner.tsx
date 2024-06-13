import { useTheme, type Theme } from "@emotion/react";
import styled from "@emotion/styled";

const Root = styled.svg<{ indeterminate: boolean }>`
    display: block;
    color: black;
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

const ProgressCircle = styled.circle`
    stroke-dasharray: 80px, 200px;
    stroke-dashoffset: 0;
    animation: strokeAnimation 1.4s ease-in-out infinite;

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