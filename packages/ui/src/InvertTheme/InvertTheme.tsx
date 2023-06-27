import { PropsWithChildren } from "react";
import { ThemeProvider, useTheme } from "@emotion/react";
import * as themes from 'styles';

export const InvertTheme = ({ children }: PropsWithChildren) => {
	const theme = useTheme();
	return (
		<ThemeProvider theme={themes[theme.inverted_theme]}>
			{children}
		</ThemeProvider>
	)
};