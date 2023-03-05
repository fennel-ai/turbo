import fs from "fs-extra";
import path from "node:path";
import { visit } from "unist-util-visit";

const fetchSnippet = (file, snippet_id) => {
	const str = fs.readFileSync(file, "utf8");

	const regex = /# docsnip\s+(\w+)\n([\s\S]+?)# \/docsnip/g;
	let match;

	while ((match = regex.exec(str)) !== null) {
		if (match[1] === snippet_id) break;
	}

	return match?.[2];
}

export default function docsnip() {
  return (tree) => {
    visit(tree, (node) => {
		if (
			node.type === "mdxJsxFlowElement" && node.name === 'pre'
		) {
			const selector = node.attributes.find(attr => attr.name === 'snippet')?.value;

			if (selector) {
				const [file, snippet_id] = selector.split('#');

				const filename = path.join("examples", file + ".py");
				let code = fetchSnippet(
					path.join(process.cwd(), "_content", filename),
					snippet_id
				);

				if (code) {
					node.type = 'mdxJsxFlowElement';
					node.name = 'pre';
					node.attributes = [
						{
							type: 'mdxJsxAttribute',
							name: 'language',
							value: 'python'
						},
						{
							type: 'mdxJsxAttribute',
							name: 'filename',
							value: filename
						}
					];
					node.children = [
						{
							type: "mdxJsxFlowElement",
							name: "code",
							children: [
								{
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
		}
    });
  };
}
