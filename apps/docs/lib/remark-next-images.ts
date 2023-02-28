import { visit } from "unist-util-visit";

function reformatSrc(src: string) {
	const slug = src.split('.gitbook').pop();

	return `/.gitbook${slug}`;
}

export const remarkNextImages = () => {
	return (tree: any) => {
		visit(tree, 'paragraph', (node) => {
			const image = node.children.find((child: any) => child.type === 'image');
			if (image) {
				image.url = reformatSrc(image.url);
			}
		})
		
		visit(tree, 'mdxJsxFlowElement', (node) => {
			if (node.name === 'img') {
				const srcAttr = node.attributes.find((attr: any) => attr.name === 'src');
				if (srcAttr) {
					srcAttr.value = reformatSrc(srcAttr.value);
				}
			} else {
				const image = node.children.find((child: any) => child.type === 'image');
				if (image) {
					image.url = reformatSrc(image.url);
				}
			}
		})
	}
}