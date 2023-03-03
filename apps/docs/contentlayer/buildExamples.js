import fs from 'fs-extra';

// captures text between # docsnip <name> and # /docsnip
// in the python test files we have in the content repo.
const DOCSNIP_REGEX = /# docsnip\s+(\w+)\s*\n([\s\S]*?)# \/docsnip/g;

const buildExamples = async (files) => {
  /// This can definitely be improved, but essentially we glob for all of the .py files in the content directory,
  /// then iterate over them checking for docsnip comments, and pulling them out into a JSON file so that we
  /// can access them through contentlayer in the docs pages.

  for await (const file of files) {
    const slug = file.split(".py")[0];

	// Read the python file as a string and test with regex for docsnip comments.
    const str = await fs.readFile(file, "utf8");
    const matches = str.matchAll(DOCSNIP_REGEX);

	if (matches.length) {
		// we nest snippets here because we add computed fields to this top-level object in the contentlayer config.
		let data = {
			snippets: {},
		};

		for (const [_, id, content] of matches) {
			data.snippets[id] = content;
		}

		// Output a JSON file with all of the snippets, namespaced by the filename and snippet id
		await fs.writeFile(path.join(slug + ".json"), JSON.stringify(data));
	}
  }
};

export default buildExamples;