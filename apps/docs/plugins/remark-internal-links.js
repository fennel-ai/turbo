import { visitParents } from "unist-util-visit-parents";

const isRelative = (str) => str.match(/\.\/(.*?$)/)

export default function remarkInternalLinks(basePath) {
  return (tree) => {
    visitParents(tree, "link", (node, parents) => {
      const url = isRelative(node.url);
      if (url) {
        const siblings = parents[parents.length - 1].children;
        siblings[siblings.indexOf(node)] = {
          ...node,
          url: `${basePath}/${url[1]}`,
        };
        return;
      }
    });
  };
}
