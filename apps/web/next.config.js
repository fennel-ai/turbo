const { BLOG_URL, DOCS_URL } = process.env;

module.exports = {
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
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: `/:path*`,
      },
      {
        source: "/docs",
        destination: `${DOCS_URL}/docs`,
      },
	  {
		source: '/docs/',
		destination: `${DOCS_URL}/docs`
	  },
      {
        source: "/docs/:path*",
        destination: `${DOCS_URL}/docs/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/oss",
        destination: "https://forms.gle/fECePNfkZvug5nNHA",
        permanent: true
      },
    ];
  }
};
