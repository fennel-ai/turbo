import { withGitbook } from './plugins/with-gitbook/index.js';

const gitbook = withGitbook({
	token: process.env.GITHUB_TOKEN,
});

const nextConfig = {
  basePath: "/docs",
  reactStrictMode: true,
  experimental: {
    transpilePackages: ["ui", "styles"],
  },
};

export default gitbook(nextConfig)