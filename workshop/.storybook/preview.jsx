import "styles/index.css";
import { ThemeProvider } from '@emotion/react';
import theme from 'styles';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
	(storyFn) => (
		<ThemeProvider theme={theme}>
			{storyFn()}
		</ThemeProvider>
	)
]