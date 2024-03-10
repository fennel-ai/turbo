import type { Plugin, Transformer } from 'unified';
import type { VFile } from 'vfile';
import fs from 'node:fs';
import path from 'node:path';
import { Visitor, visit } from 'unist-util-visit';
import { Node } from 'mdast-util-to-string/lib';

import { CONTENT_BASE } from "./constants";
import { createContentMap } from './createContentMap';

const getVersion = (file: VFile) => {
    // gets the current version for this page based on the source dir slug.
    const fileData = file.data.rawDocumentData as Record<string, string>;
    const [version] = fileData.sourceFileDir.split('/');

    return version;
}

// content map === { [version]: { [path]: [slug] } }
let contentMap: Record<string, Record<string, string>> | undefined = undefined;
// TODO: Validate image src attributes similarly.
const remarkValidateHref: Plugin = (): Transformer => {
	if (!contentMap) {
		contentMap = createContentMap()
	}

	return (tree, file) => {
        const version = getVersion(file);

        visit(tree, 'link', (node: Node) => {
            //@ts-ignore
            let link_path = node.url as string;

            const isExt = link_path.startsWith('http');

            //! Here we are essentially ignoring the header anchor links for now
            //! this is a little more complex as we need rehype to run for the heading IDs to be present on each `node`
            //! Need to work out a way around this when running the validator via remark-cli.
            if (link_path.includes('#')) {
                link_path = link_path.split("#")[0];
            }

            if (!isExt) {

                let full_path = path.join(CONTENT_BASE, version, `${link_path}.md`);

                if (contentMap![version][link_path]) {
                    full_path = contentMap![version][link_path];
                }

                try {
                    fs.accessSync(full_path);
                } catch (err) {
                    file.message(
                        `Broken link: ${link_path} @ ${node.position?.start.line}:${node.position?.start.offset}`,
                        node.position,
                        undefined,
                    )
                }
            }
        });
	}
}

export default remarkValidateHref;