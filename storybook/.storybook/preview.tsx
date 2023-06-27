import React from 'react';
import type { DecoratorFn } from '@storybook/react';
import { ThemeProvider } from "@emotion/react";
import * as themes from "styles";

import "styles/index.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const globalTypes = {
	theme: {
		name: "Theme",
		description: "Global UI Theme",
		defaultValue: 'light',
		toolbar: {
			// The icon for the toolbar item
			icon: 'circlehollow',
			// Array of options
			items: [
				{ value: 'light', icon: 'circlehollow', title: 'light' },
				{ value: 'dark', icon: 'circle', title: 'dark' },
			],
			// Property that specifies if the name of the item will be displayed
			showName: true,
		},
	}
};

const withTheme: DecoratorFn = (StoryFn, ctx) => {
	const { theme } = ctx.globals;
	return (
		<ThemeProvider theme={themes[theme]}>
			<StoryFn />
		</ThemeProvider>
	)
}

export const decorators = [
  withTheme,
];
