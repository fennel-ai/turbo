const { withContentlayer } = require('next-contentlayer');

const nextConfig = {
  basePath: "/docs",
  trailingSlash: true,
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

module.exports = withContentlayer(nextConfig)