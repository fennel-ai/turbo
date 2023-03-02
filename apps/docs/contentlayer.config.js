import { defineDocumentType, defineNestedType, makeSource } from 'contentlayer/source-files';

const Section = defineNestedType(() => ({
	name: "Section",
	filePathPattern: 'sections/*.md',
	fields: {
		name: {
			type: 'string',
			required: true,
		}
	}
}));

export const DocPage = defineDocumentType(() => ({
  name: "DocPage",
  filePathPattern: "files/**/*.md",
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
    slug: {
      type: "string",
      description:
        "Optionally provide a string to override the slug. By default it uses the directory structure.",
    },
	order: {
		type: "number",
		description: "The order of the page in the navigation."
	}
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => {
		let slug = post.slug || post._raw.flattenedPath.replace(/files\/?/, "");

		if (slug.includes('/index')) slug = slug.replace(/\/index$/, '');

		return slug;
	  },
    },
    section: {
      type: "reference",
      resolve: (post) => {
		let section = post.section || post._raw.sourceFileDir.replace(/files\/?/, "");
		return section
	  },
      of: Section,
	  embedDocument: true
    },
  },
}));

export default makeSource({
	contentDirPath: 'content', 
	documentTypes: [DocPage],
})