import { css } from '@emotion/react';
import { Theme } from 'styles';

export const SIZE = {
    'small': () => css`
        height: 2rem;
    `,
    'large': () => css`
        height: 2.5rem;
    `,
}

export const STYLE = {
    'flat': ({ color, theme }: { color: 'neutral' | 'primary', theme: Theme}) => css`
        background-color: ${theme[color].accent}; 
        color: ${theme[color].on};
        box-shadow: 0px 2px 6px -1px rgba(13, 18, 27, 0.24), 0px 0px 0px 1px ${theme[color].accent};
    `,
    'ghost': ({ color, theme }: { color: 'neutral' | 'primary', theme: Theme }) => css`
        background-color: transparent;
        color: ${theme[color].accent};
    `,
    'outline': ({ color, theme }: { color: 'neutral' | 'primary', theme: Theme }) => css`
        background-color: ${theme.glass};
        color: ${theme[color].accent};
        // TODO: New border color here in place of rgba(7, 4, 58, 0.08)
        box-shadow:  0px 2px 4px -2px rgba(13, 18, 27, 0.16), 0px 0px 0px 0.5px rgba(7, 4, 58, 0.08);
        backdrop-filter: blur(0.5rem);
    `,
    'glass': ({ color, theme }: { color: 'neutral' | 'primary', theme: Theme }) => css`
        background-color: none;
        color: ${theme[color].accent};
        backdrop-filter: blur(0.5rem);
    `,
}

export const SHAPE = {
    'rounded': ({ direction, hasIcon, size }: { direction: 'row' | 'row-reverse'; hasIcon?: boolean; size: 'small' | 'large' }) => {
        let padding = 0.75;
        let iconPadding = !hasIcon ? padding : padding - 0.25;
        return css`
            border-radius: 0.5rem;
            padding-left: ${direction === 'row-reverse' ? iconPadding : padding}rem;
            padding-right: ${direction === 'row' ? iconPadding : padding}rem;
        `
    },
    'pill': ({ direction, hasIcon, size }: { direction: 'row' | 'row-reverse'; hasIcon?: boolean; size: 'small' | 'large' }) => {
        let padding = size === 'large' ? 1.0 : 0.75;
        let iconPadding = !hasIcon ? padding : padding - 0.25;
        return css`
            border-radius: 999px;
            padding-left: ${direction === 'row-reverse' ? iconPadding : padding}rem;
            padding-right: ${direction === 'row' ? iconPadding : padding}rem;
        `
    },
}