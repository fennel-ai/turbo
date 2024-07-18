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
    'flat': ({ color, disabled, theme }: { color: 'neutral' | 'primary', disabled: boolean, theme: Theme}) => {
        let resolvedColor = !disabled ? color : 'neutral';

        return css`
            background-color: ${disabled ? 'rgba(7, 4, 58, 0.04)' : theme[color].accent};
            color: ${theme[resolvedColor].on};
            opacity: ${!disabled ? 1.0 : 0.24};
            box-shadow: ${theme.shadows.button[resolvedColor][!disabled ? 'default' : 'disabled']};

            &:hover {
                box-shadow: ${theme.shadows.button[resolvedColor][!disabled ? 'hover' : 'disabled']};
            }
            
            &:active {
                box-shadow: ${theme.shadows.button[resolvedColor][!disabled ? 'active' : 'disabled']};
            }
        `
    },
    'ghost': ({ color, disabled, theme }: { color: 'neutral' | 'primary', disabled: boolean, theme: Theme }) => css`
        background-color: transparent;
        color: ${theme[color].accent};
        opacity: ${!disabled ? 1.0 : 0.24};
    `,
    'outline': ({ disabled, theme }: { disabled: boolean, theme: Theme }) => css`
        background-color: ${theme.surface};
        color: ${theme.on};
        box-shadow: ${theme.shadows.button['outlined'][!disabled ? 'default' : 'disabled']};

        &:hover {
            box-shadow: ${theme.shadows.button['outlined'][!disabled ? 'hover' : 'disabled']};
        }
        
        &:active {
            box-shadow: ${theme.shadows.button['outlined'][!disabled ? 'active' : 'disabled']};
        }
    `,
    'glass': ({ color, disabled, theme }: { color: 'neutral' | 'primary', disabled: boolean, theme: Theme }) => css`
        background-color: ${theme.glass};
        color: ${theme[color].accent};
        opacity: ${!disabled ? 1.0 : 0.24};
        backdrop-filter: blur(0.5rem);
    `,
    'hero': ({ color, disabled, theme }: { color: 'neutral' | 'primary', disabled: boolean, theme: Theme }) => css`
        background: rgb(${theme.ref.purple['5']});
        box-shadow: 0px 91px 114px rgba(105, 88, 202, 0.11), 0px 38.0176px 47.6265px rgba(105, 88, 202, 0.079074), 0px 20.326px 25.4634px rgba(105, 88, 202, 0.0655718), 0px 11.3946px 14.2746px rgba(105, 88, 202, 0.055), 0px 6.05159px 7.58112px rgba(105, 88, 202, 0.0444282), 0px 2.5182px 3.15467px rgba(105, 88, 202, 0.030926), 0px 0px 0px 1px #FFFFFF;
        color: ${`rgb(${theme.ref.purple[40]})`};
        opacity: ${!disabled ? 1.0 : 0.24};
        backdrop-filter: blur(0.5rem);
        transition: box-shadow 0.3s ease-in-out, scale 0.2s ease-in-out;
        & {
            height: 3.5rem ;
        }
        font-size: 18px;
        &:hover{
            box-shadow: 0px 91px 114px rgba(105, 88, 202, 0.2), 0px 38.0176px 47.6265px rgba(105, 88, 202, 0.1), 0px 20.326px 25.4634px rgba(105, 88, 202, 0.12), 0px 11.3946px 14.2746px rgba(105, 88, 202,  0.1), 0px 6.05159px 7.58112px rgba(105, 88, 202, 0.08), 0px 2.5182px 3.15467px rgba(105, 88, 202, 0.06), 0px 0px 0px 1px #FFFFFF;
            transform: scale(1.02)
        }
    `
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