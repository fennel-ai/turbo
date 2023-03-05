import { readFileSync } from "node:fs";
import path from "node:path";
import type { MdxJsxAttribute, MdxJsxFlowElement } from "mdast-util-mdx-jsx";
import type { Transformer } from 'unified';
import { visit, Visitor } from "unist-util-visit";

const fetchSnippet = (file_content: string, snippet_id: string) => {
  const regex = /# docsnip\s+(\w+)\n([\s\S]+?)# \/docsnip/g;
  let match;

  while ((match = regex.exec(file_content)) !== null) {
    if (match[1] === snippet_id) break;
  }

  return match?.[2];
};

export default function docsnip(): Transformer {
  return function transformer(tree): void {
	  const visitor: Visitor<MdxJsxFlowElement> = (node) => {
		  if (node.type === "mdxJsxFlowElement" && node.name === "pre") {

			  const snippet_attr = node.attributes.find(
				  (attr) => (attr as MdxJsxAttribute).name === "snippet"
			  ); 

			  if (snippet_attr?.value) {
				  const [file, snippet_id] = (snippet_attr.value as string).split("#");

				  const filename = path.join("examples", file + ".py");
				  const file_content = readFileSync(path.join(process.cwd(), "_content", filename), "utf8");

				  let code = fetchSnippet(
					  file_content,
					  snippet_id
				  );

				  if (code) {
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
		  }
	  }; // @ts-ignore
    visit(tree, visitor);
  };
}
