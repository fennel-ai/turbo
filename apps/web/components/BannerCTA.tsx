import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import NextLink from 'next/link'
import { Container } from 'ui';
import ArrowUpRightIcon from 'ui/icons/arrow-narrow-up-right.svg';
import CloseIcon from 'ui/icons/close.svg';
import { useMatchMedia } from 'hooks';

const Root = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    height: 2.5rem;
    background-color: ${({ theme }) => theme.color.purple['20']};
    display: flex;
    align-items: stretch;

    &::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(to left, #F8AC66 0%, #E883CA 24%, #6958CA 46%)
    }
`;

const Wrapper = styled(Container)`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Content = styled(NextLink)`
    display: flex;
    align-items: center;
    gap: 1rem;
    user-select: none;
    text-decoration: none;
    color: ${({ theme }) => theme.color.purple['130']};

    & > p {
        margin: 0;
        font-size: 1rem;
        line-height: 1rem;
        font-weight: 600;
        font-variation-settings: 'wght' 600;
    }
`;

const TitleChip = styled.div`
    border-radius: 999px;
    display: flex;
    align-items: center;
    gap: 0.5rem; 
    padding: 0 0.5rem;
    height: 1.75rem;
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
    color: ${({ theme }) => theme.color.purple['90']};
    font-size: 1rem;
    line-height: 1rem;
    font-weight: 600;
    font-variation-settings: "wght" 600;
    user-select: none;

    & svg {
        width: 1rem;
        height: 1rem;
    }
`;

const Dismiss = styled(Link)`
    color: ${({ theme }) => theme.color.purple['130']};
    opacity: 0.64;
    cursor: pointer;

    &:hover {
        opacity: 1;
    }
    &:active {
        opacity: 0.64;
    }
`;

const BannerCTA = ({ onDismiss }: { onDismiss: () => void }) => {
    const theme = useTheme();
    const isDesktop = useMatchMedia(`(min-width: ${theme.breakpoints.md}rem)`);

    return (
        <Root>
            <Wrapper>
                <Content href="/open-demo">
                    <TitleChip><div />Live Open Demo</TitleChip>
                    {
                        isDesktop ? (
                            <p>Join Co-Founder & CEO Nikhil Garg on August 6th as we deep-dive into Fennel.</p>
                        ) : (
                            <Link>
                                <p>Join us on Aug 6th</p>
                                <ArrowUpRightIcon />
                            </Link>
                        )
                    }
                    {isDesktop ? (
                        <Link>
                            Learn More
                            <ArrowUpRightIcon />
                        </Link>
                    ) : null}
                </Content>
                <Dismiss onClick={onDismiss}>
                    {isDesktop ? 'Dismiss' : ''}
                    <CloseIcon />
                </Dismiss>
            </Wrapper>
        </Root>
    );
}

export default BannerCTA;