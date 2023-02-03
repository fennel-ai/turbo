import path from 'node:path';

import { fetchContents } from './fetchContents.js';

export const withGitDocs = (opts = {}) => async (nextConfig) => {
	const { token, dir = '_content' } = opts;

	const CWD = path.join(process.cwd(), dir);

	await fetchContents(token, CWD);
	
	return nextConfig;
};
