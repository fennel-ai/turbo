const path = require('node:path');
const { createManifest } = require('./createManifest.js');
const { fetchContents } = require('./fetchContents.js');
const { moveAssets } = require('./moveAssets.js');

module.exports.withGitbook = (opts = {}) => async (nextConfig) => {
	const { token, dir = '.content/md' } = opts;

	const CWD = path.join(process.cwd(), dir);

	// await fetchContents(token, CWD);
	
	await createManifest(CWD);

	await moveAssets(CWD);

	return nextConfig;
};
