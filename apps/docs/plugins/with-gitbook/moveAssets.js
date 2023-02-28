const fs = require("fs-extra");
const path = require("node:path");

module.exports.moveAssets = async (cwd) => {
	const currentDir = path.join(cwd, '.gitbook', 'assets')
	const targetDir = path.join(process.cwd(), 'public', 'content_assets');
	
	// Make sure the directory exists
	await fs.ensureDir(targetDir);

	// In case it already exists, empty it
	await fs.emptyDir(targetDir);

	// Copy the contents of the current directory to the target directory
	await fs.copy(currentDir, targetDir);

}