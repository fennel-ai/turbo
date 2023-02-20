import tokens from './build/light.json';

type ColorScale = {
	'0'?: string,
	'100': string,
	'200': string,
	'300': string,
	'400': string,
	'500': string,
	'600': string,
	'700': string,
	'800': string,
	'900': string,
	'1000'?: string,
};

type RefColors = Record<string, ColorScale | string>;

type ThemeAccentPalette = {
	accent: string,
	'on-accent': string,
	background: string, 
	'on-background': string,
}

type TypographyValue = {
	fontFamily?: string,
	fontSize?: string,
	fontWeight?: string,
	letterSpacing?: string,
	lineHeight?: string,
}

export type Breakpoint = "2xs" | "xs" | "sm" | "md" | "lg" | "xl";

export type Theme = {
	base: string,
	breakpoints: Record<Breakpoint, number>, // Breakpoints are a map of size name to rem value representing the screen width of that breakpoint.
	fontFamilies: {
		code: string,
		text: string,
		title: string,
	},
	fontWeights: {
		regular: string,
		medium: string,
		semibold: string,
		bold: string, 
		extrabold: string,
	},
	glass: {
		backgroundBlur: string,
		fill: string,
	},
	ref: RefColors,
	bg: {
		default: string,
		muted: string,
	},
	fg: {
		border: string,
		default: string,
		muted: string,
		shadow: string,
	},
	inv: {
		bg: {
			default: string,
			muted: string,
		},
		fg: {
			border: string,
			default: string,
			muted: string,
			shadow: string,
		},
	}
	disabled: {
		background: string,
		foreground: string,
	},
	background: string,
	surface: string,
	text: string,
	'text-alt': string,
	border: string,
	shadow: string,
	primary: ThemeAccentPalette,
	secondary: ThemeAccentPalette,
	error: ThemeAccentPalette,
	caution: ThemeAccentPalette,
	success: ThemeAccentPalette
	'icon-button': {
		radius: string,
	},
	radii: Record<string, string>,
	opacity: Record<string, string>,
	'code-block': {
		filename: {
			color: string,
			text: TypographyValue,
		},
		radius: string,
		shadow: string, 
		snippet: {
			code: TypographyValue,
			'line-number': TypographyValue,
		}
	},
}

const theme: Theme = {
	breakpoints: {
		'2xs': 25, // 400px
		xs: 40, // 640px
		sm: 48, // 768px
		md: 62, // 992px
		lg: 75, // 1200
		xl: 96, // 1304px (1240+ 32 padding on each side)
	},
	...tokens
}

export default theme