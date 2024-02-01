export type ExampleFileDef = {
	index?: number | null; // The index of the mdx node in the tree
	file: string; // The file name of the example
	snippet_id: string; // The id of the snippet
	node?:MdxJsxFlowElement // actual node
}
