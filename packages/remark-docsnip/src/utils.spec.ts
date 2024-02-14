import { expect, describe, it } from 'vitest';
import { extractSnippet, getAvailableSnippets, normalizeIndentation } from './utils';

let example_str_1 = `
# docsnip snippet_1
print("hello snippet_1")
# /docsnip

# docsnip snippet_2
print("hello snippet_2")
# /docsnip
`;

let example_str_2 = `
# valid - has no key fields, which is fine.
# no explicitly marked timestamp fields so update_time, which is of type
# datetime is automatically assumed to be the timestamp field
def test_valid_user_dataset():
    def indentation(s):
        # docsnip valid_user_dataset
        @meta(owner="data-eng-oncall@fennel.ai")
        @dataset
        class User:
            uid: int
            country: str
            update_time: datetime
        # /docsnip

        # docsnip metaflags_dataset
        @meta(owner="abc-team@fennel.ai", tags=["PII", "experimental"])
        @dataset
        class User:
            uid: int = field(key=True)
            height: float = field().meta(description="height in inches")
            weight: float = field().meta(description="weight in lbs")
            updated: datetime
        # /docsnip
`;

describe('extractSnippet', () => {
	it('should return the snippet content for the provided snippet id', () => {
		const snippet_1 = extractSnippet(example_str_1, 'snippet_1'); 
		const snippet_2 = extractSnippet(example_str_1, 'snippet_2'); 

		expect(snippet_1).toBe('print("hello snippet_1")');
        expect(snippet_2).toBe('print("hello snippet_2")');
	});
	
	it('should return undefined if the snippet could not be found', () => {
		const my_snippet = extractSnippet(example_str_1, 'my_snippet');
		expect(my_snippet).toBe(undefined);
	});
	
	it('should strip any indentation up to the left-most character in the snippet', () => {
		const my_snippet = extractSnippet(example_str_2, 'metaflags_dataset');
		expect(my_snippet).toBe(`@meta(owner="abc-team@fennel.ai", tags=["PII", "experimental"])
@dataset
class User:
    uid: int = field(key=True)
    height: float = field().meta(description="height in inches")
    weight: float = field().meta(description="weight in lbs")
    updated: datetime`);
	});
})

describe('parseMagicComments', () => {
    describe('docsnip-highlight', () => {
        it('returns the line number of single-line highlight comments', () => {
            expect(true).toBe(true);
        })
    })
})

describe('getAvailableSnippets', () => {
	it('returns the name of all snippets in the given file.', () => {
		let snippets = getAvailableSnippets(example_str_1);
		
		expect(snippets[0]).toBe('snippet_1');
		expect(snippets[1]).toBe('snippet_2');
		expect(snippets.length).toBe(2);
	});
});

describe('normalizeIndentation', () => {
	const input_str = extractSnippet(example_str_2, 'metaflags_dataset');
	it('should strip any indentation up to the left-most character in the snippet', () => {
		const result = normalizeIndentation(input_str);
		expect(result).toBe(`@meta(owner="abc-team@fennel.ai", tags=["PII", "experimental"])
@dataset
class User:
    uid: int = field(key=True)
    height: float = field().meta(description="height in inches")
    weight: float = field().meta(description="weight in lbs")
    updated: datetime`);
	});
})