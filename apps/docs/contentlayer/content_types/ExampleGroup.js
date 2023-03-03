import { defineDocumentType } from "contentlayer/source-files";

export const ExampleGroup = defineDocumentType(() => ({
  name: "ExampleGroup",
  filePathPattern: "examples/**/*.json",
  contentType: "data",
  fields: {
    snippets: {
      type: "json",
      description: "key value map of snippet id to snippet content.",
    },
  },
  computedFields: {
    id: {
      type: "string",
      resolve: (example) => {
        return example._raw.flattenedPath.replace(/examples\/?/, "");
      },
    },
  },
}));
