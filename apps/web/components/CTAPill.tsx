import styled from '@emotion/styled';
import { MouseEventHandler } from 'react';
import { useMatchMedia } from 'hooks';

import ChevronRightIcon from 'ui/icons/chevron-right-small.svg';
import { useTheme } from '@emotion/react';

const Root = styled.div`
    display: flex;
    align-items: center;
    box-shadow: 0 0 0 0.5px ${({ theme }) => theme.border};
    padding: 0.25rem;
    padding-right: 0.75rem;
    border-radius: 999px;
    gap: 0.75rem; 
    cursor: pointer !important;

    & p {
        font-size: 1rem;
        line-height: 1.5rem;
    }
`;

const TitleChip = styled.div`
    border-radius: 999px;
    display: flex;
    align-items: center;
    gap: 0.5rem; 
    padding: 0 0.75rem;
    height: 2rem;
    background-color: ${({ theme }) => theme.neutral.accent};
    color: ${({ theme }) => theme.neutral.on};
    box-shadow: ${({ theme }) => theme.shadows.button.neutral.default};
    font-size: 0.875rem;
    line-height: 1rem;
    font-weight: 500;
    font-variation-settings: "wght" 500;


    & > div {
        background-color: ${({ theme }) => theme.color.red["70"]};
        border-radius: 50%;
        width: 0.375rem;
        height: 0.375rem;
        opacity: 0;
        animation: blink 2000ms ease-in-out infinite;

        @keyframes blink {
            0% {
                opacity: 0;
            }
            25% {
                opacity: 1;
            }
            50% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }
    }
`;

const Link = styled.div`
    display: flex;
    align-items: center;
    gap: 0.25rem; 
    color: ${({ theme }) => theme.primary.accent};
    font-size: 1rem;
    line-height: 1rem;
    font-weight: 500;
    font-variation-settings: "wght" 500;

    & svg {
        width: 1rem;
        height: 1rem;
    }
`;

type CTAPillProps = {
    onClick?: MouseEventHandler<HTMLDivElement>
};

const CTAPill = (props: CTAPillProps) => {
    const theme = useTheme();
    const isDesktop = useMatchMedia(`(min-width: ${theme.breakpoints.md}rem)`);
    return (
        <Root onClick={props.onClick}>
            <TitleChip><div />Live Open Demo</TitleChip>
            {isDesktop ? <p>Join us on August 6th as we deep-dive into Fennel.</p> : null}
            <Link>
                {isDesktop ? "Learn more" : "Join us on Aug 6th"}
                <ChevronRightIcon />
            </Link>
        </Root>
    )
};

export default CTAPill;