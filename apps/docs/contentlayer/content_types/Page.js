import { defineDocumentType } from "contentlayer/source-files";

import { bundleMDX } from 'mdx-bundler'
import { toMarkdown } from 'mdast-util-to-markdown'
import { mdxToMarkdown } from 'mdast-util-mdx'
export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: "pages/**/*.md",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The page title",
      required: true,
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
    slug: {
      type: "string",
      description:
        "Optionally provide a string to override the generated slug.",
    },
    order: {
      type: "number",
      description: "The order of the page in the navigation.",
      required: true,
    },
  },
  computedFields: {
    // Ensures that the status field is lowercased, will fallback to above definition if not present (and therefore default to `draft`)
    status: {
      type: "enum",
      options: ["draft", "wip", "published"],
      description:
        "Draft pages only appear in Development. WIP pages appear in Production but are marked as incomplete. Published pages are generated in Production and are publicly accessible.",
      default: "draft",
      resolve: (post) => post.status?.toLowerCase?.()
    },
    slug: {
      type: "string",
      resolve: (post) =>
        post.slug || post._raw.flattenedPath.replace(/pages\/?/, ""),
    },
    section: {
      type: "string",
      resolve: (post) => post._raw.sourceFileDir.replace(/pages\/?/, ""),
    },
    headings: {
      type: "json",
      resolve: async (doc) => {
        const headings = [];

        await bundleMDX({
          source: doc.body.raw,
          mdxOptions: (opts) => {
            opts.remarkPlugins = [
              ...(opts.remarkPlugins ?? []),
              tocPlugin(headings),
            ];
            return opts;
          },
        });

        return [{ level: 1, title: doc.title }, ...headings];
      },
    },
  },
}));


const tocPlugin =
  (headings) =>
  () => {
    return (node) => {
      for (const element of node.children.filter((_) => _.type === 'heading' || _.name === 'OptionsTable')) {
        if (element.type === 'heading') {
          const title = toMarkdown({ type: 'paragraph', children: element.children }, { extensions: [mdxToMarkdown()] })
            .trim()
            .replace(/<.*$/g, '')
            .replace(/\\/g, '')
            .trim()
          headings.push({ level: element.depth, title })
        } else if (element.name === 'OptionsTable') {
          element.children
            .filter((_) => _.name === 'OptionTitle')
            .forEach((optionTitle) => {
              optionTitle.children
                .filter((_) => _.type === 'heading')
                .forEach((heading) => {
                  const title = toMarkdown(
                    { type: 'paragraph', children: heading.children },
                    { extensions: [mdxToMarkdown()] },
                  )
                    .trim()
                    .replace(/<.*$/g, '')
                    .replace(/\\/g, '')
                    .trim()
                  headings.push({ level: heading.depth, title })
                })
            })
        }
      }
    }
  }