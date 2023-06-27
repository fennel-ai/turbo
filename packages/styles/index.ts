import lightTokens from './build/light.json';
import darkTokens from './build/dark.json';

type ColorScale = {
	'5': string,
	'10': string,
	'20': string,
	'30': string,
	'40': string,
	'50': string,
	'60': string,
	'70': string,
	'80': string,
	'90': string,
	'95': string,
};

type RefColors = Record<string, ColorScale | string>;

type ThemeAccentPalette = {
	accent: string,
	on: string,
}

type TypographyValue = {
	fontFamily?: string,
	fontSize?: string,
	fontWeight?: string,
	letterSpacing?: string,
	lineHeight?: string,
}

type SyntaxTheme = {
	boolean: string,
	builtins: string,
	char: string,
	'class-name': string,
	code: {
		fontFamily: string,
		fontSize: string,
		fontWeight: string,
		letterSpacing: string,
		lineHeight: string,
	},
	comment: string,
	constant: string,
	diff: {
		deleted: string,
		inserted: string,
	},
	function: string,
	important: string,
	keyword: string,
	'line-number': {
		fontFamily: string,
		fontSize: string,
		fontWeight: string,
		letterSpacing: string,
		lineHeight: string,
	},
	number: string,
	operator: string,
	plain: {
		background: string,
		foreground: string,
	},
	property: string,
	punctuation: string,
	regex: string,
	string: string,
	symbol: string,
	url: string,
	variable: string,
}

export type Breakpoint = "2xs" | "xs" | "sm" | "md" | "lg" | "xl";

export type Theme = {
	base: string,
	inverted_theme: string,
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
	syntax: SyntaxTheme,
	ref: RefColors,
	
	background: string;
	surface: string;
	on: string;
	on_alt: string;
	border: string;
	shadow: string;
	primary: ThemeAccentPalette,
	secondary: ThemeAccentPalette,
	caution: ThemeAccentPalette,
	error: ThemeAccentPalette,
	success: ThemeAccentPalette,
	neutral: ThemeAccentPalette,

	opacity: Record<string, string>,
	radii: Record<string, string>,
	typescale: Record<string, string>,
	'state-layer': {
		default: string;
		hover: string;
		active: string;
		selected: string;
	},
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

const breakpoints = {
	'2xs': 25, // 400px
	xs: 40, // 640px
	sm: 48, // 768px
	md: 62, // 992px
	lg: 67.5, // 1200px
	xl: 96, // 1304px (1240+ 32 padding on each side)
}

export const light: Theme = {
	breakpoints,
	inverted_theme: 'dark',
	...lightTokens,
}

export const dark: Theme = {
	breakpoints,
	inverted_theme: 'light',
	...darkTokens
}