import type { Plugin, Transformer } from 'unified';
import type { VFile } from 'vfile';
import fs from 'node:fs';
import path from 'node:path';
import { Visitor, visit } from 'unist-util-visit';
import { Node } from 'mdast-util-to-string/lib';

import { CONTENT_BASE } from "./constants";
import { ContentManifest, createContentManifest } from './createContentMap';

const getVersion = (file: VFile) => {
    // gets the current version for this page based on the source dir slug.
    const fileData = file.data.rawDocumentData as Record<string, string>;
    const [version] = fileData.sourceFileDir.split('/');

    return version;
}

let contentManifest: ContentManifest | undefined = undefined;

const remarkValidateHref: Plugin = (): Transformer => {
	if (!contentManifest) {
		contentManifest = createContentManifest()
	}

	return (tree, file) => {
        const version = getVersion(file);

        visit(tree, 'link', (node: Node) => {
            //@ts-ignore
            let link_path = node.url as string;

            const isExt = link_path.startsWith('http') || link_path.includes("@fennel.ai");

            //! Here we are essentially ignoring the header anchor links for now
            //! this is a little more complex as we need rehype to run for the heading IDs to be present on each `node`
            if (link_path.includes('#')) {
                link_path = link_path.split("#")[0];
            }

            if (!isExt) {
                let full_path = path.join(CONTENT_BASE, version, `${link_path}.md`);

                if (contentManifest!.content[version][link_path]) {
                    full_path = contentManifest!.content[version][link_path];
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

        visit(tree, 'image', (node: Node) => {
            //@ts-ignore
            let asset_path = node.url as string;

            const isExt = asset_path.startsWith('http');

            if (!isExt && !contentManifest!.assets[version].includes(asset_path)) {
                file.fail(
                    `Broken asset reference: ${asset_path} @ ${node.position?.start.line}:${node.position?.start.offset}`,
                    node.position,
                    undefined,
                )
            }
        })
	}
}

export default remarkValidateHref;