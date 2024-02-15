import { expect, describe, it } from 'vitest';
import { extractSnippet } from './utils';

import { MagicCommentType, parseMagicComments } from './magicComments';

//! NOTE: there is a "highlight" comment outside of a docsnip snippet
//! This should be ignored. 
let example_str_1 = `
# valid - has no key fields, which is fine.
# no explicitly marked timestamp fields so update_time, which is of type
# datetime is automatically assumed to be the timestamp field
def test_valid_user_dataset():
    # docsnip-highlight next-line
    def indentation(s):
        # docsnip valid_user_dataset
        @meta(owner="data-eng-oncall@fennel.ai") # docsnip-highlight
        @dataset
        # docsnip-highlight next-line
        class User:
            uid: int
            country: str
            update_time: datetime
        # /docsnip

        # docsnip metaflags_dataset
        # docsnip-highlight start
        @meta(owner="abc-team@fennel.ai", tags=["PII", "experimental"])
        @dataset
        class User:
            uid: int = field(key=True)
            height: float = field().meta(description="height in inches")
            weight: float = field().meta(description="weight in lbs")
            # docsnip-highlight end
            updated: datetime
        # /docsnip
`;

describe('parseMagicComments', () => {
    it('returns undefined if passed an undefined snippet', () => {
        const my_snippet = extractSnippet(`here is some code`, 'my_snippet');
        expect(parseMagicComments(my_snippet)).toBe(undefined)
    });

    describe('docsnip-highlight', () => {
        it('returns the line numbers of highlighted lines based on comment markers', () => {
            let snippet = extractSnippet(example_str_1, 'valid_user_dataset');
            let response = parseMagicComments(snippet);
            
            expect(response?.snippet).toBe(`@meta(owner="data-eng-oncall@fennel.ai")
@dataset
class User:
    uid: int
    country: str
    update_time: datetime`);

            expect(response?.props[MagicCommentType.HIGHLIGHT]?.length).toBe(2)
            expect(response?.props[MagicCommentType.HIGHLIGHT]).toEqual([0, 2])
            
            snippet = extractSnippet(example_str_1, 'metaflags_dataset');
            response = parseMagicComments(snippet);
            
            expect(response?.snippet).toBe(`@meta(owner="abc-team@fennel.ai", tags=["PII", "experimental"])
@dataset
class User:
    uid: int = field(key=True)
    height: float = field().meta(description="height in inches")
    weight: float = field().meta(description="weight in lbs")
    updated: datetime`);

            expect(response?.props[MagicCommentType.HIGHLIGHT]?.length).toBe(6)
            expect(response?.props[MagicCommentType.HIGHLIGHT]).toEqual([0, 1, 2, 3, 4, 5])
        });
    });
})