import { withGitbook } from './plugins/with-gitbook/index.js';

const gitbook = withGitbook({
	token: process.env.GITHUB_TOKEN,
});

const nextConfig = {
  basePath: "/docs",
  reactStrictMode: true,
  transpilePackages: ["ui", "styles"],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
            replaceAttrValues: {
              black: "currentColor",
            },
            svgoConfig: {
              plugins: [
                {
                  name: "removeViewBox",
                  active: false,
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
};

export default gitbook(nextConfig)