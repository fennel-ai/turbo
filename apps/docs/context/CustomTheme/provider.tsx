import { PropsWithChildren, createContext } from 'react';


export const DarkThemeContext = createContext({
    isDarkTheme: false,
    setTheme: (isDark: boolean)=>{},
})

export const DarkThemeProvider = ({ children, theme, setTheme }: PropsWithChildren<{theme: string, setTheme: (theme: 'light' | 'dark') => void}>) => {
	const value = {
		isDarkTheme: theme === 'dark',
        setTheme: (isDark: boolean) => setTheme(isDark ? 'dark' : 'light'),
	};

	return (
		<DarkThemeContext.Provider value={value}>
			{children}
		</DarkThemeContext.Provider>
	)
};

