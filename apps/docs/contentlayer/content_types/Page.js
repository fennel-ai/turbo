import { defineDocumentType } from "contentlayer/source-files";
import path from 'node:path';

import { bundleMDX } from 'mdx-bundler'
import { toMarkdown } from 'mdast-util-to-markdown'
import { mdxToMarkdown } from 'mdast-util-mdx'
export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: "**/pages/**/*.md",
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
    api: {
      type: "boolean",
      description: "Is this page an API reference page",
      resolve: (post) => post._raw.sourceFileDir.includes("api-reference"),
    },
    // Ensures that the status field is lowercased, will fallback to above definition if not present (and therefore default to `draft`)
    status: {
      type: "enum",
      options: ["draft", "wip", "published"],
      description:
        "Draft pages only appear in Development. WIP pages appear in Production but are marked as incomplete. Published pages are generated in Production and are publicly accessible.",
      default: "draft",
      resolve: (post) => post.status?.toLowerCase?.(),
    },
    slug: {
      type: "string",
      resolve: (post) => {
        const version = post._raw.sourceFileDir.split("/")[0];
        let slug =
          post.slug ||
          post._raw.flattenedPath
            .replace(/pages\/?/, "")
            .replace(/main\/?/, ""); // slugs for `main` pages should not include the version slug (i.e. docs/welcome-to-fennel/quickstart vs docs/0.1.0/welcome-to-fennel/quickstart)

        // If the slug is being set manually via the frontmatter (post.slug) and the version is NOT main, we
        // need to prefix the slug with the version to avoid clashes (this happens automatically for pages whose
        // slug is inferred from the directory path above with the exception of "main")
        if (post.slug && version !== "main") {
          slug = path.join(version, post.slug);

          if (slug.endsWith("/")) {
            slug = slug.slice(0, -1);
          }
        }

        return slug;
      },
    },
    section: {
      type: "string",
      resolve: (post) => {
        const version = post._raw.sourceFileDir.split("/")[0];
        return post._raw.sourceFileDir
          .replace(/pages\/?/, "")
          .replace(`${version}/`, "");
      },
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
    version: {
      type: "string",
      description: "The version of the documentation this page belongs to",
      resolve: (post) => post._raw.sourceFileDir.split("/")[0],
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