import styled from '@emotion/styled';
import { TitleBlock } from '../TitleBlock';

import { media } from 'styles/utils';
import { ReactNode } from 'react';

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    border-bottom: 0.5px solid ${({ theme }) => theme.border};
    overflow: hidden;
    padding-top: 10rem;
    padding-bottom: 4rem;
    transform: translateZ(0);

    & #bg {
        position: absolute;
        inset: 0;
        top: -8rem;
        z-index: -1;
        width: 100%;
        height: 100%;
    }

    &::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: calc(100% - 10rem);
        height: 35.75rem;
        border-radius: 20.5rem;
        background: linear-gradient(137deg, #6958CA 10.53%, #E883CA 43.4%, #F8AC66 87.15%);
        filter: blur(52px);
        opacity: 0.12;
        pointer-events: none;
        user-select: none;
        z-index: -1;
    }
`;

const Wrapper = styled.div`
    padding: 0;
    margin: 0 auto;
    color: ${({ theme }) => theme.on_alt};;

    ${media('md')} {
        max-width: 53.5rem;
	}
`;

const IntroText = styled.p`
	padding: 0;
	color: ${({ theme }) => theme.on_alt};
    padding-left: 2.5rem;
    padding-right: 2.5rem;
    font-size: 1.25rem; 
    line-height: 1.75rem;
    font-variation-settings: "wght" 500;
	
	${media('md')} {
        padding-left: 7.5rem;
        padding-right: 7.5rem;
	}
`;

interface HeroProps {
    actions?: JSX.Element[],
    children?: ReactNode,
    className?: string,
    subtitle?: ReactNode,
    title: string;
    text?: string;
}

export const Hero = ({ actions, className, children, subtitle, text, title }: HeroProps) => {
    return <Root>
        <svg id="bg" width="1512" height="528" viewBox="0 0 1512 528" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M120 100.5L224.042 187.202C226.55 189.292 228 192.388 228 195.652V294.336C228 298.165 229.991 301.719 233.258 303.718L338.743 368.282C342.009 370.281 344 373.835 344 377.664V513.812C344 517.379 345.73 520.726 348.642 522.788L416 570.5" stroke="black" stroke-opacity="0.06" />
            <path d="M1392 100.5L1287.96 187.202C1285.45 189.292 1284 192.388 1284 195.652V294.336C1284 298.165 1282.01 301.719 1278.74 303.718L1173.26 368.282C1169.99 370.281 1168 373.835 1168 377.664V513.812C1168 517.379 1166.27 520.726 1163.36 522.788L1096 570.5" stroke="black" stroke-opacity="0.06" />
            <path d="M120 289.5V347.016C120 350.747 121.892 354.224 125.024 356.251L242.476 432.249C245.608 434.276 247.5 437.753 247.5 441.484V551.5" stroke="black" stroke-opacity="0.06" />
            <path d="M1392 289.5V347.016C1392 350.747 1390.11 354.224 1386.98 356.251L1269.52 432.249C1266.39 434.276 1264.5 437.753 1264.5 441.484V551.5" stroke="black" stroke-opacity="0.06" />
        </svg>
        <Wrapper>
            <TitleBlock 
                actions={actions} 
                center
            >
                {subtitle ? subtitle : null}
                <h1>{title}</h1>
                {text ? <IntroText>{text}</IntroText> : null}
            </TitleBlock>
            {children}
        </Wrapper>
    </Root>
}