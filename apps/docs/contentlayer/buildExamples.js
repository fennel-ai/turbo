import fs from 'fs-extra';

// captures text between # docsnip <name> and # /docsnip
// in the python test files we have in the content repo.
const DOCSNIP_REGEX = /# docsnip\s(.*?)\s*\n([\s\S]*?)# \/docsnip/u;

const buildExamples = async (files) => {
  /// This can definitely be improved, but essentially we glob for all of the .py files in the content directory,
  /// then iterate over them checking for docsnip comments, and pulling them out into a JSON file so that we
  /// can access them through contentlayer in the docs pages.

  for await (const file of files) {
	// Read the python file as a string and test with regex for docsnip comments.
    const str = await fs.readFile(file, "utf8");
    const matches = DOCSNIP_REGEX.exec(str);

	if (matches.length) {
		// we nest snippets here because we add computed fields to this top-level object in the contentlayer config.
		let data = {
			snippets: {},
		};

		const [_, id, content] = matches;
		data.snippets[id] = content;

		// Output a JSON file with all of the snippets, namespaced by the filename and snippet id
		await fs.writeFile(
			file.replace('.py', '.json'),
			JSON.stringify(data)
		);
	}
  }
};

export default buildExamples;