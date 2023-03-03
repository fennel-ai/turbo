import { defineDocumentType } from "contentlayer/source-files";

export const DocPage = defineDocumentType(() => ({
  name: "DocPage",
  filePathPattern: "pages/**/*.md",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The page title",
    },
    status: {
      type: "enum",
      options: ["draft", "wip", "published"],
      description:
        "Draft pages only appear in Development. WIP pages appear in Production but are marked as incomplete. Published pages are generated in Production and are publicly accessible.",
      default: "draft",
    },
    description: {
      type: "string",
      description: "The page description",
    },
    section: {
      type: "string",
      description:
        "Optionally provide a string to override the section. By default it uses the parent directory names and tries to match them to a section file.",
    },
    order: {
      type: "number",
      description: "The order of the page in the navigation.",
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => post._raw.flattenedPath.replace(/pages\/?/, ""),
    },
    section: {
      type: "string",
      resolve: (post) => post._raw.sourceFileDir.replace(/pages\/?/, ""),
    },
  },
}));
