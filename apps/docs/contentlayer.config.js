import "dotenv/config";
import fs from "fs-extra";
import path from "node:path";
import { makeSource } from "contentlayer/source-remote-files";

// Remark/Rehype plugins
import remarkGfm from "remark-gfm";
import remarkMdxDisableExplicitJsx from "remark-mdx-disable-explicit-jsx";
import remarkDirective from "remark-directive";
import rehypeImgSize from "rehype-img-size";
import rehypeSlug from "rehype-slug";
import docsnip from "remark-docsnip";
import remarkAdmonitions from "./contentlayer/plugins/remark-admonitions";

// Content types
import { Page } from "./contentlayer/content_types/Page";

import fetchContent from "./contentlayer/fetchContent";
import { Config } from "./contentlayer/content_types/Config";
import { APIConfig  } from "./contentlayer/content_types/APIRefConfig";

const CONTENT_DIR = "_content";

const githubSource = async () => {
  if (process.env.MODE === "EDIT") {
    console.log(
      `[Edit Mode]: Content will not be fetched from the content repo`
    );
    await fs.ensureDir(path.join(process.cwd(), CONTENT_DIR));
  } else {
    console.log(`Pulling content from content repo...`);
    // replace this with octokit:
    await fetchContent(process.env.GITHUB_TOKEN, CONTENT_DIR);
  }

  // Move assets to nexts static dir
  await fs.copy(
    path.join(process.cwd(), CONTENT_DIR, "assets"),
    path.join(process.cwd(), "public", "assets"),
    { overwrite: true }
  );
  // NOOP We don't need to do anything as we're not subscribing to any data changes right now.
  return () => {};
};

export default makeSource({
  syncFiles: githubSource,
  contentDirPath: CONTENT_DIR,
  documentTypes: [Page, Config, APIConfig],
  contentDirExclude: [
    ".git",
    ".gitignore",
    "docker-compose.yml",
    "Makefile",
    "README.md",
    "algolia.config.json",
    "deprecated",
  ],
  mdx: {
    remarkPlugins: [
      remarkMdxDisableExplicitJsx,
      remarkGfm,
      remarkDirective,
      remarkAdmonitions,
      docsnip,
    ],
    rehypePlugins: [[rehypeImgSize, { dir: "public" }], rehypeSlug],
  },
});
