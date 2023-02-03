import path from 'node:path';
import { createManifest } from './createManifest.js';

import { fetchContents } from './fetchContents.js';

export const withGitDocs = (opts = {}) => async (nextConfig) => {
	const { token, dir = '.content/md' } = opts;

	const CWD = path.join(process.cwd(), dir);

	await fetchContents(token, CWD);
	
	await createManifest(CWD);

	return nextConfig;
};
