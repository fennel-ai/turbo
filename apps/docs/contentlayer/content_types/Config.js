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

const Version = defineNestedType(() => ({
	name: 'Version',
	fields: {
		name: {
			type: 'string',
			required: true
		},
		head: {
			type: 'string',
            description: "The commit hash containing the content for this version of the documentation",
			required: true
		}
	}
}))

export const VersionsManifest = defineDocumentType(() => ({
  name: "Versions",
  filePathPattern: "main/versions.yml",
  isSingleton: true,
  contentType: "data",
  fields: {
    versions: {
      type: "list",
      description:
        "A list of available alternate versions of the documentation (excl. current/main)",
        of: Version,
    },
  },
}));

export const Config = defineDocumentType(() => ({
  name: "Config",
  filePathPattern: "**/index.yml",
  contentType: "data",
  fields: {
    sidebar: {
      type: "list",
      of: SidebarSection,
    },
  },
  computedFields: {
    version: {
      type: "string",
      description:
        "The version of the documentation that this config pertains to.",
      resolve: (post) => post._raw.sourceFileDir.split("/")[0],
    },
  },
}));

export const APIConfig = defineDocumentType(() => ({
  name: "APIConfig",
  filePathPattern: "**/api.yml",
  contentType: "data",
  fields: {
    sidebar: {
      type: "list",
      of: SidebarSection,
    },
  },
  computedFields: {
    version: {
      type: "string",
      description:
        "The version of the documentation that this config pertains to.",
      resolve: (post) => post._raw.sourceFileDir.split("/")[0],
    },
  },
}));