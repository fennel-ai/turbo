export type ExampleFileDef = {
	node: MdxJsxFlowElement // actual node
    snippets: SnippetIdentifier[]
}

export type SnippetIdentifier = {
    file: string; // The file name of the example file
    snippet_id: string; // The id of the snippet in the example file
}
