import { defineDocumentType, defineNestedType } from "contentlayer/source-files";

const SidebarSection = defineNestedType(() => ({
	name: 'SidebarSection',
	fields: {
		slug: {
			type: 'string',
			required: true
		},
		title: {
			type: 'string',
			required: true
		},
		pages: {
			type: 'json',
			required: true
		}
	}
}))

export const Config = defineDocumentType(() => ({
  name: "Config",
  filePathPattern: "config.yml",
  isSingleton: true,
  contentType: 'data',
  fields: {
    sidebar: {
      type: "list",
	  of: SidebarSection
    }
  }
}));
