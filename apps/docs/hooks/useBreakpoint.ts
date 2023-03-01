import { useContext } from 'react';
import { useTheme } from '@emotion/react';
import type { Breakpoint, Theme } from 'styles';
import { useMatchMedia } from "./useMatchMedia";

export const useBreakpoint = (breakpoint: Breakpoint, minmax: 'min' | 'max') => {
	const theme = useTheme();
	const { breakpoints } = theme;
	return useMatchMedia(`(${minmax}-width: ${breakpoints[breakpoint]}rem)`);
};