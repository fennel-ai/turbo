import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import remarkGfm from "remark-gfm";
import remarkMdxDisableExplicitJsx from "remark-mdx-disable-explicit-jsx";
import remarkDirective from 'remark-directive';
import rehypeImgSize from "rehype-img-size";
import remarkAdmonitions from "./plugins/remark-admonitions";

const Section = defineDocumentType(() => ({
  name: "Section",
  filePathPattern: "sections/**/*.mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    order: {
      type: "number",
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (section) =>
        section._raw.flattenedPath.replace(/sections\/?/, ""),
    },
  },
}));

export const DocPage = defineDocumentType(() => ({
  name: "DocPage",
  filePathPattern: "files/**/*.md",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The page title",
    },
    published: {
      type: "boolean",
      description:
        "If true the page will be generated for prod and is publicly accessible. If false, the page is only visible in dep.",
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
      resolve: (post) => post._raw.flattenedPath.replace(/files\/?/, ""),
    },
    section: {
      type: "string",
      resolve: (post) => post._raw.sourceFileDir.replace(/files\/?/, ""),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [DocPage, Section],
  mdx: {
    remarkPlugins: [
      remarkMdxDisableExplicitJsx,
      remarkGfm,
      remarkDirective,
      remarkAdmonitions,
    ],
    rehypePlugins: [[rehypeImgSize, { dir: "public" }]],
  },
});