import path from 'node:path';
import type { Transformer } from 'unified';
import { visit } from "unist-util-visit";

interface ImageNode extends Node {
    url: string;
    alt: string;
}

export default function remarkVersionedAssets(): Transformer {
    return (tree, file) => {
        // gets the current version for this page based on the source dir slug.
        const fileData = file.data.rawDocumentData as Record<string, string>;    
        const [version] = fileData.sourceFileDir.split('/');

        // Prefix all image urls with the version slug.
        visit(tree, 'image', (node: ImageNode) => {
            node.url = path.join(`/${version}`, node.url);
        })
    };
}
