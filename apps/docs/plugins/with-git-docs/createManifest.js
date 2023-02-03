import { globby } from 'globby';

export const createManifest = async (dir) => {
	console.log('DIR', process.cwd(), dir)
	const files = await globby(`**/*.md`, { dot: true, cwd: dir });

  console.log(files);
}