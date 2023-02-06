import colors from './colors.json';

const theme = {
	colors: {
		background: colors.grey[8],
		surface: colors.white,
		text: colors.grey[0],
		text_alt: colors.grey[3],
		border: colors.grey[7],
		shadow: colors.grey[2],
		primary: {
			accent: colors.purple[4],
			on_accent: colors.white,
			background: colors.purple[8],
			on_background: colors.purple[1]
		},
		secondary: {
			accent: colors.blue[4],
			on_accent: colors.white,
			background: colors.blue[8],
			on_background: colors.blue[1]
		},
		error: {
			accent: colors.red[4],
			on_accent: colors.white,
			background: colors.red[8],
			on_background: colors.red[1]
		},
		caution: {
			accent: colors.yellow[4],
			on_accent: colors.white,
			background: colors.yellow[8],
			on_background: colors.yellow[1]
		},
		success: {
			accent: colors.green[4],
			on_accent: colors.white,
			background: colors.green[8],
			on_background: colors.green[1]
		},
	}
}

export default theme