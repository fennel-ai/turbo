import { readFileSync } from "node:fs";
import path from "node:path";
import type { MdxJsxAttribute, MdxJsxFlowElement } from "mdast-util-mdx-jsx";
import type { Transformer } from 'unified';
import { visit, Visitor } from "unist-util-visit";

import { searchForSnippet } from './searchForSnippet';

export default function docsnip(): Transformer {
  return function transformer(tree): void {
	  const visitor: Visitor<MdxJsxFlowElement> = (node) => {
		  if (node.type === "mdxJsxFlowElement" && node.name === "pre") {

			  const snippet_attr = node.attributes.find(
				  (attr) => (attr as MdxJsxAttribute).name === "snippet"
			  ); 

			  if (snippet_attr?.value) {
				  const [file, snippet_id] = (snippet_attr.value as string).split("#");

				  // Create the filename string that we can pass through to the element as an attribute 
				  // allowing it to be surfaced in the ui.
				  const filename = path.join("examples", file + ".py");

				  // Get an absolute path to the python file on disk, and read it into a string.
				  const file_content = readFileSync(path.join(process.cwd(), "_content", filename), "utf8");

				  let code = searchForSnippet(
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
