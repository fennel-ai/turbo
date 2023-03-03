import fs from 'fs-extra';
import path from 'node:path';
import { globby } from 'globby';

import runBashCommand from "./runBashCommand";

// captures text between # docsnip <name> and # /docsnip
// in the python test files we have in the content repo.
const DOCSNIP_REGEX = /# docsnip\s+(\w+)\s*\n([\s\S]*?)# \/docsnip/g;

const githubSource = 
	(REPO_URL, CONTENT_DIR) => 
	async () => {
		if (process.env.MODE === 'EDIT') {
			console.log(`Skipping content pull whilst editing locally...`);
			await fs.ensureDir(path.join(process.cwd(), CONTENT_DIR));
		} else {
			console.log(`Pulling content from ${REPO_URL}`);
			
			await runBashCommand(`
				if [ -d  "${CONTENT_DIR}" ];
					then
					cd "${CONTENT_DIR}"; git pull;
					else
					git clone --depth 1 --single-branch ${REPO_URL} ${CONTENT_DIR};
				fi
				`);
		}

		/// This can definitely be improved, but essentially we glob for all of the .py files in the content directory,
		/// then iterate over them checking for docsnip comments, and pulling them out into a JSON file so that we 
		/// can access them through contentlayer in the docs pages.
		const pyfiles = await globby([`${CONTENT_DIR}/**/*.py`]);

		for await (const pyfile of pyfiles) {
			const slug = pyfile.split(".py")[0];
			
			const str = await fs.readFile(pyfile, 'utf8');
			const matches = str.matchAll(DOCSNIP_REGEX);

			// we nest snippets here because we add computed fields to this top-level object in the contentlayer config.
			let data = {
				snippets: {}
			};
			for (const [_, id, content] of matches) {
				data.snippets[id] = content;
			}

			if (Object.keys(data.snippets).length > 0) {
				await fs.writeFile(path.join(slug + ".json"), JSON.stringify(data));
			}
		}
		// NOOP We don't need to do anything as we're not subscribing to any data changes right now.
		return () => {};
	};

export default githubSource