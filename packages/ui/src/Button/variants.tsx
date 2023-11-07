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
    'flat': ({ color, disabled, theme }: { color: 'neutral' | 'primary', disabled: boolean, theme: Theme}) => css`
        background-color: ${disabled ? 'rgba(7, 4, 58, 0.04)' : theme[color].accent};
        color: ${disabled ? 'rgba(7, 4, 58, 0.32)' : theme[color].on};
        box-shadow: ${!disabled ? `0px 2px 6px -1px rgba(13, 18, 27, 0.24), 0px 0px 0px 1px ${theme[color].accent}` : 'none'};
    `,
    'ghost': ({ color, disabled, theme }: { color: 'neutral' | 'primary', disabled: boolean, theme: Theme }) => css`
        background-color: transparent;
        color: ${disabled ? 'rgba(7, 4, 58, 0.32)' : theme[color].accent};
    `,
    'outline': ({ color, disabled, theme }: { color: 'neutral' | 'primary', disabled: boolean, theme: Theme }) => css`
        background-color: ${theme.glass};
        color: ${disabled ? 'rgba(7, 4, 58, 0.32)' : theme[color].accent};
        box-shadow: ${!disabled ? `0px 2px 4px -2px rgba(13, 18, 27, 0.16), 0px 0px 0px 0.5px ${theme.border.light}` : `0px 0px 0px 0.5px ${theme.border.light}`};
        backdrop-filter: blur(0.5rem);
    `,
    'glass': ({ color, disabled, theme }: { color: 'neutral' | 'primary', disabled: boolean, theme: Theme }) => css`
        background-color: ${theme.glass};
        color: ${disabled ? 'rgba(7, 4, 58, 0.32)' : theme[color].accent};
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
    'pill': ({ direction, hasIcon, size, theme }: { direction: 'row' | 'row-reverse'; hasIcon?: boolean; size: 'small' | 'large', theme: Theme }) => {
        let padding = size === 'large' ? 1.0 : 0.75;
        let iconPadding = !hasIcon ? padding : padding - 0.25;
        return css`
            border-radius: 999px;
            padding-left: ${direction === 'row-reverse' ? iconPadding : padding}rem;
            padding-right: ${direction === 'row' ? iconPadding : padding}rem;
        `
    },
}