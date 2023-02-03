import { withGitDocs } from './plugins/with-git-docs/index.js';

const GitDocs = withGitDocs({
	token: process.env.GITHUB_TOKEN,
});

const nextConfig = {
  basePath: "/docs",
  reactStrictMode: true,
  experimental: {
    transpilePackages: ["ui"],
  },
};

export default GitDocs(nextConfig)