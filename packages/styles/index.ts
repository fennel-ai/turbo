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
	'100': string,
	'110': string,
	'120': string,
	'130': string,
	'140': string,
};

type RefColors = Record<string, ColorScale & { '150': string } | string>;

type ThemeAccentPalette = {
	accent: string,
	on: string,
}

type Typescale = {
    "0": string,
    "1": string,
    "2": string,
    "3": string,
    "4": string,
    "5": string,
    "6": string,
    "7": string,
    "8": string,
    "9": string,
    "10": string,
    "11": string,
    "12": string,
    "13": string,
    "14": string,
    "15": string,
}

type OpacityScale = {
    "0": string,
    "1": string,
    "2": string,
    "3": string,
    "4": string,
    "5": string,
    "6": string,
    "7": string,
    "8": string,
    "9": string,
    "10": string,
    "11": string,
    "12": string,
    "13": string,
    "14": string,
    "15": string,
}

type TypographyValue = {
	fontFamily?: string,
	fontSize?: string,
	fontWeight?: string,
	letterSpacing?: string,
	lineHeight?: string,
}

type TypographySet = {
    small?: TypographyValue,
    default: TypographyValue,
    large?: TypographyValue,
}

type SyntaxTheme = {
	boolean: string,
	builtins: string,
	char: string,
	'class-name': string,
	code: {
        default: TypographyValue,
        small: TypographyValue,
    },
	comment: string,
	constant: string,
	diff: {
		deleted: string,
		inserted: string,
	},
    'double-quote-string': string,
	'function-call': string,
	'function-definition': string,
	important: string,
	keyword: string,
    label: {
        default: TypographyValue,
        small: TypographyValue
    }
    'lineNumber': {
        default: TypographyValue,
        small: TypographyValue
    },
	number: string,
	operator: string,
	plain: {
		background: string,
        border: string,
		foreground: string,
        'line-number': string
	},
	property: string,
	punctuation: string,
	regex: string,
	string: string,
	symbol: string,
    'triple-quote-string': string,
	url: string,
	variable: string,
}

type ButtonShadowTokens = {
    default: string,
    hover: string,
    active: string,
    disabled?: string
}

export type Breakpoint = "2xs" | "xs" | "sm" | "md" | "lg" | "xl";

export type Theme = {
	base: string,
	type: 'light' | 'dark';
	inverted_theme: string,
	breakpoints: Record<Breakpoint, number>, // Breakpoints are a map of size name to rem value representing the screen width of that breakpoint.
	fontFamilies: {
		mono: string,
		primary: string,
	},
	fontWeights: {
        mono: {
            light: string,
            medium: string,
            regular: string
        },
        primary: {
            regular: string,
            medium: string,
            semibold: string,
            bold: string,
            extrabold: string,
        }
    },

    // Code
	syntax: SyntaxTheme,
    'line-number-container': {
        default: {
            fill: string
        },
        scrolled: {
            backgroundBlur: string,
            borderColor: string,
            borderWidthRight: string,
            fill: string,
        }
    },

    // Scales
	ref: RefColors,
    color: {
        purple: ColorScale,
        blue: ColorScale,
        green: ColorScale,
        red: ColorScale,
        yellow: ColorScale,
        grey: ColorScale,
    },
    typescale: Typescale,
    opacity: OpacityScale,
    radii: {
        xs: string,
        sm: string,
        md: string,
        lg: string,
        xl: string,
        '2xl': string,
        '3xl': string,
    },
    letterSpacing: {
        small: string,
        medium: string,
        large: string,
    },
    'state_layer': {
        "0": string;
        "1": string;
        "2": string;
        "3": string;
        "4": string;
        "5": string;
    }

    // Typography
    title: TypographySet,
    subtitle: TypographySet,
    label: TypographySet,
    body: TypographySet,
    display: TypographySet

    // Shadows
    shadows: {
        button: {
            caution: ButtonShadowTokens,
            error: ButtonShadowTokens,
            neutral: ButtonShadowTokens,
            outlined: ButtonShadowTokens,
            primary: ButtonShadowTokens,
            secondary: ButtonShadowTokens,
            success: ButtonShadowTokens,
            surface: ButtonShadowTokens,
        },
        sheet: string,
    }
	
    // Colors (Generics)
	background: string;
	surface: string;
	on: string;
	on_alt: string;
	border: {
        light: string;
        heavy: string;
    };
	shadow: string;
	glass: string;

    // Colors (Accents)
	primary: ThemeAccentPalette,
	secondary: ThemeAccentPalette,
	caution: ThemeAccentPalette,
	error: ThemeAccentPalette,
	success: ThemeAccentPalette,
	neutral: ThemeAccentPalette,
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
	type: 'light',
	inverted_theme: 'dark',
	...lightTokens,
}

export const dark: Theme = {
	breakpoints,
	type: 'dark',
	inverted_theme: 'light',
	...darkTokens
}