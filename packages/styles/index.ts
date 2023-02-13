import colors from './theme/colors.json';

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

type RefColors = Record<string, ColorScale>;

type ThemeAccentPalette = {
	accent: string,
	on_accent: string,
	background: string, 
	on_background: string,
}

type ThemePalette = {
	background: string,
	surface: string,
	on: string,
	on_alt: string,
	border: string,
	shadow: string,
	primary: ThemeAccentPalette,
	secondary: ThemeAccentPalette,
	error: ThemeAccentPalette,
	caution: ThemeAccentPalette,
	success: ThemeAccentPalette
}

export type Breakpoint = "2xs" | "xs" | "sm" | "md" | "lg" | "xl";

export type Theme = {
	breakpoints: Record<Breakpoint, number>, // Breakpoints are a map of size name to rem value representing the screen width of that breakpoint.
	colors: RefColors,
	palette: ThemePalette,
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
	colors,
	palette: {
		background: colors.grey['900'],
		surface: colors.grey['1000'],
		on: colors.grey['100'],
		on_alt: colors.grey['400'],
		border: colors.grey['800'],
		shadow: colors.grey['300'],
		primary: {
			accent: colors.purple['500'],
			on_accent: colors.grey['1000'],
			background: colors.purple['900'],
			on_background: colors.purple['200']
		},
		secondary: {
			accent: colors.blue['500'],
			on_accent: colors.grey['1000'],
			background: colors.blue['900'],
			on_background: colors.blue['200']
		},
		error: {
			accent: colors.red['500'],
			on_accent: colors.grey['1000'],
			background: colors.red['900'],
			on_background: colors.red['200']
		},
		caution: {
			accent: colors.yellow['500'],
			on_accent: colors.grey['1000'],
			background: colors.yellow['900'],
			on_background: colors.yellow['200']
		},
		success: {
			accent: colors.green['500'],
			on_accent: colors.grey['1000'],
			background: colors.green['900'],
			on_background: colors.green['200']
		},
	}
}

export default theme