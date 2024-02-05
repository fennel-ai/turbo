import { FunctionInterpolation, css } from '@emotion/react';
import type { Breakpoint, Theme } from './index';
import tinycolor from 'tinycolor2';

type StyledProps = {
	theme: Theme
}

const _getFromObj = (obj: any, path: string, fallback: any, p?: any, undef?: any) => {
	let key: string[] = path && path.split ? path.split(".") : [path]
	for (p = 0; p < key.length; p++) {
		obj = obj ? obj[key[p]] : undef;
	}
	return obj === undef ? fallback : obj;
};

export const get =
	(path: string, fallback = null) =>
		(props: StyledProps) =>
			_getFromObj(props.theme, path, fallback);

export const breakpoint = 
	(path: string, fallback: any = null) =>
		(props: StyledProps) =>
			_getFromObj(props.theme.breakpoints, path, fallback);

export const media = (bp: Breakpoint, type: 'min' | 'max' = 'min', fallback: any = null) => 
	(props: StyledProps) => {
		const value = breakpoint(bp, fallback)(props);
		
		return `@media (${type}-width: ${value}rem)`;
	};

/**
 * 	Given a color string (hsl, rgb, hex, etc.) and an value between 0 and 1 (0 being fully-opaque and 1 being a solid color)
 *  sets the alpha channel and returns the modified color string.
 */
export const rgba = (color: string, alpha: number) => {
	if (alpha < 0 || alpha > 1) {
		throw new Error(`Invalid alpha value ${alpha} provided to rgba()`);
	}

	return tinycolor(color).setAlpha(alpha).toRgbString();
}

export const accessibility = (color: string, on_color: string, size: 'small' | 'large' = 'small') => {
	return tinycolor.isReadable(color, on_color, { level: "AA", size });
}

type StateLayerOpts = {
    /**
     * Sets the initial opacity value that the state layer renders at
     * Default: 0
     */
    initial?: number;
    /**
     * Sets the color of the state layer (Almost always inherits foreground via currentColor)
     * Default: currentColor
     */
    color?: string;
    /**
     * Toggles the interaction styles for :hover and :active
     */
    interact?: boolean;
}

export const stateLayer = ({
    initial = 0, 
    color = "currentColor",
    interact = true
}: StateLayerOpts = {}): FunctionInterpolation<any> => 
	() => css`
		position: relative;
        transform: translateZ(0);

		&::before {
			content: "";
			position: absolute;
			inset: 0;
			background-color: ${color};
			opacity: ${initial};
			z-index: -1;
		}

		&:hover::before {
			opacity: ${interact ? initial + 0.04 : initial};
		}
		
		&:active::before {
			opacity: ${interact ? initial + 0.08 : initial};
		}
	`;