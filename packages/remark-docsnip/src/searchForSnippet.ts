export const searchForSnippet = (file_content: string, snippet_id: string) => {
	const regex = /# docsnip\s+(\w+)\n([\s\S]+?)# \/docsnip/g;
	let match;

	while ((match = regex.exec(file_content)) !== null) {
		if (match[1] === snippet_id) break;
	}

	return match?.[2];
};