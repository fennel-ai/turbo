import "dotenv/config";
import fs from "fs-extra";
import path from "node:path";
import { makeSource } from "contentlayer/source-remote-files";
import { parse as parseYaml } from "yaml";

// Remark/Rehype plugins
import remarkGfm from "remark-gfm";
import remarkMdxDisableExplicitJsx from "remark-mdx-disable-explicit-jsx";
import remarkDirective from "remark-directive";
import rehypeImgSize from "rehype-img-size";
import rehypeSlug from "rehype-slug";
import codeTabs from "remark-code-tabs";
import docsnip from "remark-docsnip";
import rehypeMdxCodeProps from "rehype-mdx-code-props";
import remarkAdmonitions from "./contentlayer/plugins/remark-admonitions";

// Content types
import { Page } from "./contentlayer/content_types/Page";

import fetchContent from "./contentlayer/fetchContent";
import {
  Config,
  APIConfig,
  VersionsManifest,
} from "./contentlayer/content_types/Config";

const CONTENT_DIR = "_content";

const githubSource = async () => {
    await fs.ensureDir(path.join(process.cwd(), CONTENT_DIR));

    if (process.env.MODE === "EDIT") {
        console.log(
        `[Edit Mode]: Content will not be fetched from the content repo`
        );
    } else {
        await fs.emptyDir(CONTENT_DIR);

        console.log(`Pulling content from content repo...`);
        await fetchContent(process.env.GITHUB_TOKEN, CONTENT_DIR, [{ name: 'main', head: 'main' }]);
    }

    // We now have the content in mainDir
    const versionsManifestStr = await fs.readFile(path.join(CONTENT_DIR, 'main', "versions.yml"), 'utf-8');
    const versionsManifest = parseYaml(versionsManifestStr);

    const { versions } = versionsManifest;

    // Fetch all other versions listed in the versions manifest
    await fetchContent(process.env.GITHUB_TOKEN, CONTENT_DIR, versions);

    // Move assets to nexts static dir
    for await (const version of [{ name: 'main', head: 'main' }, ...versions]) {
        const assetPath = path.join(
          process.cwd(),
          "public",
          "assets",
          version.name
        );

        await fs.ensureDir(assetPath)
        await fs.copy(
            path.join(process.cwd(), CONTENT_DIR, version.name, "assets"),
            assetPath,
            { overwrite: true }
        );
    }

  // NOOP We don't need to do anything as we're not subscribing to any data changes right now.
  return () => {};
};

export default makeSource({
  syncFiles: githubSource,
  contentDirPath: CONTENT_DIR,
  documentTypes: [Page, Config, APIConfig, VersionsManifest],
  contentDirExclude: [
    "main/.git",
    "main/.gitignore",
    "main/docker-compose.yml",
    "main/Makefile",
    "main/README.md",
    "main/algolia.config.json",
    "main/deprecated",
    "0.20.19/.git",
    "0.20.19/.gitignore",
    "0.20.19/docker-compose.yml",
    "0.20.19/Makefile",
    "0.20.19/README.md",
    "0.20.19/algolia.config.json",
    "0.20.19/deprecated",
  ],
  mdx: {
    remarkPlugins: [
      remarkMdxDisableExplicitJsx,
      remarkGfm,
      remarkDirective,
      remarkAdmonitions,
      docsnip,
      codeTabs, //! <- NOTE: After docsnip
    ],
    rehypePlugins: [
      [rehypeImgSize, { dir: "public" }],
      rehypeSlug,
      rehypeMdxCodeProps,
    ],
  },
});
