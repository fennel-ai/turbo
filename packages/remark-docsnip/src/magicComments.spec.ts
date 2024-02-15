import { expect, describe, it } from 'vitest';
import { extractSnippet } from './utils';

import { MagicCommentType, parseMagicComments } from './magicComments';

//! NOTE: in the connectors snippet, we have a "next-line" modifier on the last line,
//! this should be stripped from the output but not handled as a highlighted line
let example_str = `
# docsnip imports
from datetime import datetime, timedelta
from typing import Optional

# docsnip-highlight next-line
import pandas as pd
import requests

# docsnip-highlight start
from fennel.datasets import dataset, pipeline, field, Dataset
from fennel.featuresets import feature, featureset, extractor
from fennel.lib.aggregate import Count
from fennel.lib.expectations import (
    expectations,
    expect_column_values_to_be_between,
)
# docsnip-highlight end
from fennel.lib.metadata import meta
from fennel.lib.schema import inputs, outputs
from fennel.sources import source, Postgres, Snowflake, Kafka, Webhook # docsnip-highlight

# /docsnip

# docsnip connectors
# docsnip-highlight next-line
postgres = Postgres.get(name="my_rdbms")
warehouse = Snowflake.get(name="my_warehouse")
kafka = Kafka.get(name="my_kafka") # docsnip-highlight next-line
webhook = Webhook(name="fennel_webhook") # docsnip-highlight next-line
# /docsnip
`;

const imports_snippet = `from datetime import datetime, timedelta
from typing import Optional

import pandas as pd
import requests

from fennel.datasets import dataset, pipeline, field, Dataset
from fennel.featuresets import feature, featureset, extractor
from fennel.lib.aggregate import Count
from fennel.lib.expectations import (
    expectations,
    expect_column_values_to_be_between,
)
from fennel.lib.metadata import meta
from fennel.lib.schema import inputs, outputs
from fennel.sources import source, Postgres, Snowflake, Kafka, Webhook`

const connectors_snippet = `postgres = Postgres.get(name="my_rdbms")
warehouse = Snowflake.get(name="my_warehouse")
kafka = Kafka.get(name="my_kafka")
webhook = Webhook(name="fennel_webhook")`

describe('parseMagicComments', () => {
    it('returns undefined if passed an undefined snippet', () => {
        const my_snippet = extractSnippet(`here is some code`, 'my_snippet');
        expect(parseMagicComments(my_snippet)).toBe(undefined)
    });

    describe('docsnip-highlight', () => {
        it('should strip all valid docsnip-highlight comments from the output', () => {
            let snippet = extractSnippet(example_str, 'imports');
            let response = parseMagicComments(snippet);
            
            expect(response?.snippet).toBe(imports_snippet);
            
            snippet = extractSnippet(example_str, 'connectors');
            response = parseMagicComments(snippet);
            
            expect(response?.snippet).toBe(connectors_snippet);
        })

        it('returns a string of comma-separated line-numbers to be highlighted', () => {
            let snippet = extractSnippet(example_str, 'connectors');
            let response = parseMagicComments(snippet);

            expect(response?.props[MagicCommentType.HIGHLIGHT]).toEqual("1, 4")
        });

        it('should handle ranges of highlighted lines using the start and end modifiers', () => {
            const response = parseMagicComments(extractSnippet(example_str, 'imports'));

            expect(response?.props[MagicCommentType.HIGHLIGHT]).toEqual("4, 7, 8, 9, 10, 11, 12, 13, 16")
        })
    });
})