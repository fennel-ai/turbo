import path from 'node:path';
import { readFile as rf } from 'node:fs';
import { promisify } from 'node:util';

import { searchForSnippet } from './searchForSnippet';
import { ExampleFileDef } from '.';

const readFile = promisify(rf);

export const extractSnippet = async ({
	index,
	file,
	snippet_id,//@ts-ignore
}: ExampleFileDef, tree) => {
	// Create the filename string that we can pass through to the element as an attribute 
	// allowing it to be surfaced in the ui.
	const filename = path.join("examples", file + ".py");

	// Get an absolute path to the python file on disk, and read it into a string.
	const file_content = await readFile(path.join(process.cwd(), "_content", filename), "utf8");

	let code = searchForSnippet(
		file_content,
		snippet_id
	);

	if (code) {
		// @ts-ignore
		let node = tree.children[index];

		node.type = "mdxJsxFlowElement";
		node.name = "pre";
		node.attributes = [
			{
				type: "mdxJsxAttribute",
				name: "language",
				value: "python",
			},
			{
				type: "mdxJsxAttribute",
				name: "filename",
				value: filename,
			},
		];
		node.children = [
			{
				type: "mdxJsxFlowElement",
				name: "code",
				children: [
					{ // @ts-ignore
						type: "raw",
						value: code,
					},
				],
			},
		];
	} else {
		throw new Error(`Snippet ${snippet_id} not found in ${filename}`);
	}
}