import type { Theme } from './index';

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


export const palette =
	(path: string, fallback: any = null) =>
		(props: StyledProps) =>
			_getFromObj(props.theme.palette, path, fallback);

export const color =
	(path: string, fallback: any = null) =>
		(props: StyledProps) =>
			_getFromObj(props.theme.colors, path, fallback);