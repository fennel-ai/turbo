import { mergeConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

const config = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
  },
  features: {
    storyStoreV7: true,
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
		plugins: [svgr({
			exportAsDefault: true,
			svgrOptions: {
				icon: true,
				replaceAttrValues: {
					"black": "currentColor"
				},
				svgoConfig: {
					plugins: [
						{
							name: "removeViewBox",
							active: false,
						},
					],
				},
			}
		})],
    });
  },
};

export default config; 
