import path from 'node:path';
import { readFile as rf } from 'node:fs';
import { promisify } from 'node:util';
import trimEnd from 'lodash/trimEnd';

import { extractSnippet } from './utils';
import { ExampleFileDef } from './types';
import { MdxJsxAttribute } from 'mdast-util-mdx-jsx/lib';
import { parseMagicComments } from './magicComments';

const readFile = promisify(rf);

export const findAndReplace = async ({
	node,
	file,
    snippet_id
}: ExampleFileDef) => {
    // Clear the children of the node and set it to an empty array.
    node.children = [];

    // Create the filename string that we can pass through to the element as an attribute 
    // allowing it to be surfaced in the ui.
    const filename = path.join("examples", file + ".py");

    // Get an absolute path to the python file on disk, and read it into a string.
    const file_content = await readFile(path.join(process.cwd(), "_content", filename), "utf8");

    let parsed = parseMagicComments(extractSnippet(file_content, snippet_id));
    
    if (parsed) {
        const statusAttr = node.attributes.find(
            (attr: MdxJsxAttribute) => attr.name === "status"
        );

        const messageAttr = node.attributes.find(
            (attr: MdxJsxAttribute) => attr.name === "message"
        );

        const langAttr = node.attributes.find(
            (attr: MdxJsxAttribute) => attr.name === "language"
        );

        const highlightAttr = parsed.attributes.find(attr => attr.name === 'highlight') || node.attributes.find(
                (attr: MdxJsxAttribute) => attr.name === "highlight"
            );

        const nameAttr = node.attributes.find(
            (attr: MdxJsxAttribute) => attr.name === "name"
        );

        node.type = "mdxJsxFlowElement";
        node.name = "pre";

        node.attributes = [
            {
                type: "mdxJsxAttribute",
                name: "language",
                value: langAttr?.value || "python",
            },
            {
                type: "mdxJsxAttribute",
                name: "filename",
                value: filename,
            },
            {
                type: 'mdxJsxAttribute',
                name: 'snippetId',
                value: snippet_id,
            },
            {
                type: 'mdxJsxAttribute',
                name: 'name',
                value: nameAttr?.value || '',
            },
            {
                type: 'mdxJsxAttribute',
                name: 'status',
                value: statusAttr?.value || ''
            },
            {
                type: 'mdxJsxAttribute',
                name: 'message',
                value: messageAttr?.value || ''
            },
            {
                type: 'mdxJsxAttribute',
                name: 'highlight',
                value: highlightAttr?.value || ''
            },
        ];

        node.children.push({
            type: "mdxJsxFlowElement",
            name: "code",
            children: [
                { // @ts-ignore
                    type: "raw",
                    value: trimEnd(parsed.snippet, "\n"),
                },
            ],
        });
    } else {
        throw new Error(`Snippet ${snippet_id} not found in ${filename}`);
    }
}

