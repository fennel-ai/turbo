import { useTheme } from '@emotion/react';
import type { Breakpoint } from 'styles';
import { useMatchMedia } from "./useMatchMedia";

export const useBreakpoint = (breakpoint: Breakpoint, minmax: 'min' | 'max') => {
	const theme = useTheme();
	const { breakpoints } = theme;
	return useMatchMedia(`(${minmax}-width: calc(${breakpoints[breakpoint]}rem - ${minmax === 'min' ? 0 : 1}px))`);
};