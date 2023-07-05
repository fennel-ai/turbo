import { PropsWithChildren, useContext } from 'react';
import { ThemeProvider } from '@emotion/react';
import * as themes from 'styles';
import SectionThemeContext from './SectionThemeContext';

const SectionTheme = ({ children, defaultTheme = 'light' }: PropsWithChildren<{ defaultTheme?: 'light' | 'dark' }>) => {
	const sectionTheme = useContext(SectionThemeContext);
	return (
		<ThemeProvider theme={themes[sectionTheme || defaultTheme]}>
			{children}
		</ThemeProvider>
	)
}

export default SectionTheme;