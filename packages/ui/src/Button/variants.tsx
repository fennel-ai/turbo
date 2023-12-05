import { css } from '@emotion/react';
import { Theme } from 'styles';
import { rgba } from 'styles/utils';

export const SIZE = {
    'small': () => css`
        height: 2rem;
    `,
    'large': () => css`
        height: 2.5rem;
    `,
}

/* Play Button */

/* Auto layout */
// display: flex;
// flex-direction: row;
// align-items: center;
// padding: 16px 20px 16px 16px;
// gap: 8px;

// position: absolute;
// width: 217px;
// height: 56px;
// left: calc(50% - 217px/2 - 0.5px);
// top: calc(50% - 56px/2);

// background: rgba(240, 240, 255, 0.72);
// box-shadow: 0px 91px 114px rgba(105, 88, 202, 0.11), 0px 38.0176px 47.6265px rgba(105, 88, 202, 0.079074), 0px 20.326px 25.4634px rgba(105, 88, 202, 0.0655718), 0px 11.3946px 14.2746px rgba(105, 88, 202, 0.055), 0px 6.05159px 7.58112px rgba(105, 88, 202, 0.0444282), 0px 2.5182px 3.15467px rgba(105, 88, 202, 0.030926), 0px 0px 0px 1px #FFFFFF;
// backdrop-filter: blur(4px);
// /* Note: backdrop-filter has minimal browser support */
// border-radius: 104px;

// /* Inside auto layout */
// flex: none;
// order: 1;
// flex-grow: 0;
// z-index: 1;


// /* play-circle */

// width: 20px;
// height: 20px;


// /* Inside auto layout */
// flex: none;
// order: 0;
// flex-grow: 0;


// /* Solid */

// position: absolute;
// left: 4.17%;
// right: 4.17%;
// top: 4.17%;
// bottom: 4.17%;

// /* light/ref/purple/40 */
// background: #453AA6;


// /* See Fennel in action */

// width: 153px;
// height: 24px;

// font-family: 'Haskoy';
// font-style: normal;
// font-weight: 500;
// font-size: 18px;
// line-height: 24px;
// /* identical to box height, or 133% */
// letter-spacing: -0.02em;

// /* light/ref/purple/40 */
// color: #453AA6;


// /* Inside auto layout */
// flex: none;
// order: 1;
// flex-grow: 0;


export const STYLE = {
    'flat': ({ color, disabled, theme }: { color: 'neutral' | 'primary', disabled: boolean, theme: Theme}) => css`
        background-color: ${disabled ? 'rgba(7, 4, 58, 0.04)' : theme[color].accent};
        color: ${disabled ? 'rgba(7, 4, 58, 0.32)' : theme[color].on};
        box-shadow: ${!disabled ? `0px 2px 6px -1px ${rgba(theme.shadow, 0.24)}, 0px 0px 0px 1px ${theme[color].accent}` : 'none'};
    `,
    'ghost': ({ color, disabled, theme }: { color: 'neutral' | 'primary', disabled: boolean, theme: Theme }) => css`
        background-color: transparent;
        color: ${disabled ? 'rgba(7, 4, 58, 0.32)' : theme[color].accent};
    `,
    'outline': ({ color, disabled, theme }: { color: 'neutral' | 'primary', disabled: boolean, theme: Theme }) => css`
        background-color: ${theme.glass};
        color: ${disabled ? 'rgba(7, 4, 58, 0.32)' : theme[color].accent};
        box-shadow: ${!disabled ? `0px 2px 4px -2px ${rgba(theme.shadow, 0.24)}, 0px 0px 0px 0.5px ${theme.border.light}` : `0px 0px 0px 0.5px ${theme.border.light}`};
        backdrop-filter: blur(0.5rem);
    `,
    'glass': ({ color, disabled, theme }: { color: 'neutral' | 'primary', disabled: boolean, theme: Theme }) => css`
        background-color: ${theme.glass};
        color: ${disabled ? 'rgba(7, 4, 58, 0.32)' : theme[color].accent};
        backdrop-filter: blur(0.5rem);
    `,
    'glass-highlight': ({ color, disabled, theme }: { color: 'neutral' | 'primary', disabled: boolean, theme: Theme }) => css`
        background: rgb(${theme.ref.purple[95]});
        box-shadow: 0px 91px 114px rgba(105, 88, 202, 0.11), 0px 38.0176px 47.6265px rgba(105, 88, 202, 0.079074), 0px 20.326px 25.4634px rgba(105, 88, 202, 0.0655718), 0px 11.3946px 14.2746px rgba(105, 88, 202, 0.055), 0px 6.05159px 7.58112px rgba(105, 88, 202, 0.0444282), 0px 2.5182px 3.15467px rgba(105, 88, 202, 0.030926), 0px 0px 0px 1px #FFFFFF;
        color: ${disabled ? 'rgba(7, 4, 58, 0.32)' : `rgb(${theme.ref.purple[40]})`};
        backdrop-filter: blur(0.5rem);
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