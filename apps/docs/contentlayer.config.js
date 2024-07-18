import "dotenv/config";
import fs from "fs-extra";
import path from "node:path";
import { makeSource } from "contentlayer/source-remote-files";
import yaml from "yaml";

// Remark/Rehype plugins
import remarkGfm from "remark-gfm";
import remarkMdxDisableExplicitJsx from "remark-mdx-disable-explicit-jsx";
import remarkDirective from "remark-directive";
import rehypeImgSize from "rehype-img-size";
import rehypeSlug from "rehype-slug";
import remarkValidateHref from "remark-validate-href";
import codeTabs from "remark-code-tabs";
import docsnip from "remark-docsnip";
import contentSpec from "remark-content-spec";
import versionedContent from "remark-versioned-content";
import rehypeMdxCodeProps from "rehype-mdx-code-props";
import remarkAdmonitions from "./contentlayer/plugins/remark-admonitions";

// Content types
import { APIPage, Page } from "./contentlayer/content_types/Page";

import fetchContent from "./contentlayer/fetchContent";
import {
  Config,
  APIConfig,
  VersionsManifest,
} from "./contentlayer/content_types/Config";

const CONTENT_DIR = "_content";

const githubSource = async () => {
  let contentDir = path.join(process.cwd(), CONTENT_DIR);
  let publicDir = path.join(process.cwd(), "public");

  const processHead = process.env.HEAD_REF;

  await fs.ensureDir(contentDir);

  if (process.env.MODE === "EDIT") {
    console.log(
      `[Edit Mode]: Content will not be fetched from the content repo`
    );

    // When MODE === 'EDIT' the content is being symlinked to _content
    // so we can skip everything else and instead just move the assets
    // to public.
    const assetPath = path.join(publicDir, "main", "assets");
    await fs.ensureDir(assetPath);
    await fs.copy(
      path.join(process.cwd(), CONTENT_DIR, "main", "assets"),
      assetPath,
      { overwrite: true }
    );
  } else {
    await fs.emptyDir(CONTENT_DIR);

    console.log(`Pulling content from content repo...`);
    await fetchContent(process.env.GITHUB_TOKEN, CONTENT_DIR, [
      { name: "main", head: processHead || "main"},
    ]);

    const versionsManifestStr = await fs.readFile(
      path.join(CONTENT_DIR, "main", "versions.yml"),
      "utf-8"
    );
    const versionsManifest = yaml.parse(versionsManifestStr);

    const { versions } = versionsManifest;

    if (versions?.length && !processHead) {
      // Fetch all other versions listed in the versions manifest
      await fetchContent(process.env.GITHUB_TOKEN, CONTENT_DIR, versions);
    }
  }

  // NOOP We don't need to do anything as we're not subscribing to any data changes right now.
  return () => {};
};

export default makeSource({
  syncFiles: githubSource,
  contentDirPath: CONTENT_DIR,
  documentTypes: [Page, APIPage, Config, APIConfig, VersionsManifest],
  contentDirExclude: [
    "main/.git",
    "main/.gitignore",
    "main/docker-compose.yml",
    "main/Makefile",
    "main/README.md",
    "main/algolia.config.json",
    "main/deprecated",
  ],
  mdx: {
    remarkPlugins: [
      remarkValidateHref,
      remarkMdxDisableExplicitJsx,
      remarkGfm,
      remarkDirective,
      remarkAdmonitions,
      docsnip,
      codeTabs, //! <- NOTE: After docsnip
      contentSpec,
      versionedContent,
    ],
    rehypePlugins: [
      [rehypeImgSize, { dir: "public" }],
      rehypeSlug,
      rehypeMdxCodeProps,
    ],
  },
});
