import { expect, describe, it } from 'vitest';
import { extractSnippet, getAvailableSnippets } from './utils';

let example_str_1 = `
# docsnip snippet_1
print("hello snippet_1")
# /docsnip

# docsnip snippet_2
print("hello snippet_2")
# /docsnip
`;

describe('extractSnippet', () => {
	it('should return the snippet content for the provided snippet id', () => {
		const snippet_1 = extractSnippet(example_str_1, 'snippet_1'); 
		const snippet_2 = extractSnippet(example_str_1, 'snippet_2'); 

		expect(snippet_1).toBe('print("hello snippet_1")\n');
		expect(snippet_2).toBe('print("hello snippet_2")\n');
	});
	
	it('should return undefined if the snippet could not be found', () => {
		const my_snippet = extractSnippet(example_str_1, 'my_snippet');
		expect(my_snippet).toBe(undefined);
	});
})

describe('getAvailableSnippets', () => {
	it('returns the name of all snippets in the given file.', () => {
		let snippets = getAvailableSnippets(example_str_1);
		
		expect(snippets[0]).toBe('snippet_1');
		expect(snippets[1]).toBe('snippet_2');
		expect(snippets.length).toBe(2);
	});
})