// Taking an example file (e.g. a python file read into a string) and a snippet id, return the code between the docsnip tags.
// Will return undefined if the snippet id is not found.
export const extractSnippet = (file_content: string, snippet_id: string) => {
	// const regex = /# docsnip\s+(\w+)\n([\s\S]+?)# \/docsnip/g;
	const regex = new RegExp(`# docsnip\\s+${snippet_id}\\n([\\s\\S]+?)# \/docsnip`, 'g')
	return regex.exec(file_content)?.[1];
};

// Taking an example file (e.g. a python file read into a string) returns all snippet ids from the content
export const getAvailableSnippets = (file_content: string): string[] => {
	const regex = /# docsnip\s+(\w+)\n([\s\S]+?)# \/docsnip/g;

	return [...file_content.matchAll(regex)].map(match => match[1]);
}