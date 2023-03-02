import { visit } from "unist-util-visit";

export default function remarkAdmonitions() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === "textDirective" ||
        node.type === "leafDirective" ||
        node.type === "containerDirective"
      ) {
        if (!["info", "tip", "warning"].includes(node.name)) return;
        const type = node.name;

        node.type = "mdxJsxFlowElement";
        node.name = "Admonition";
        node.attributes = [
          { type: "mdxJsxAttribute", name: "type", value: type },
        ];
      }
    });
  };
}
