import type { Breakpoint, Theme } from './index';

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