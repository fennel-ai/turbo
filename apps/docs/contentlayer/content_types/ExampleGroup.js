import { defineDocumentType } from "contentlayer/source-files";

export const ExampleGroup = defineDocumentType(() => ({
  name: "ExampleGroup",
  filePathPattern: "examples/**/*.json",
  contentType: "data",
  fields: {
    snippets: {
      type: "json",
      description: "map of all snippets that came from the same original file, stored by the snippet id.",
    },
  },
  computedFields: {
    id: {
      type: "string",
	  description: 'e.g. if the example file is examples/quickstart.py, the id will be "quickstart", examples/quickstart/installation.py will be "quickstart/installation etc.',
      resolve: (example) => {
        return example._raw.flattenedPath.replace(/examples\/?/, "");
      },
    },
  },
}));
