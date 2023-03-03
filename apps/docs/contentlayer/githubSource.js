import fs from "fs-extra";
import path from "node:path";
import { globby } from "globby";
import { makeSource } from "contentlayer/source-remote-files";

// Remark/Rehype plugins
import remarkGfm from "remark-gfm";
import remarkMdxDisableExplicitJsx from "remark-mdx-disable-explicit-jsx";
import remarkDirective from "remark-directive";
import rehypeImgSize from "rehype-img-size";
import rehypeSlug from "rehype-slug";
import remarkAdmonitions from "./plugins/remark-admonitions";

// Content types
import { DocPage } from "./content_types/DocPage";
import { Section } from "./content_types/Section";
import { ExampleGroup } from "./content_types/ExampleGroup";

import runBashCommand from "./runBashCommand";
import buildExamples from './buildExamples';

const REPO_URL = `https://${process.env.GITHUB_TOKEN}:@github.com/fennel-ai/documentation-content.git`;
const CONTENT_DIR = "_content";

const githubSource = async () => {
  if (process.env.MODE === "EDIT") {
    console.log(`Skipping content pull whilst editing locally...`);
    await fs.ensureDir(path.join(process.cwd(), CONTENT_DIR));
  } else {
    console.log(`Pulling content from ${REPO_URL}`);

    await runBashCommand(`
		if [ -d  "${CONTENT_DIR}" ];
			then
			cd "${CONTENT_DIR}"; git pull;
			else
			git clone --depth 1 --single-branch ${REPO_URL} ${CONTENT_DIR};
		fi
	`);
  }

  const exampleFiles = await globby([`${CONTENT_DIR}/examples/**/*.py`]);
  await buildExamples(exampleFiles);

  // NOOP We don't need to do anything as we're not subscribing to any data changes right now.
  return () => {};
};

export default makeSource({
  syncFiles: githubSource,
  contentDirPath: CONTENT_DIR,
  documentTypes: [DocPage, Section, ExampleGroup],
  contentDirExclude: [".git", ".gitignore", "docker-compose.yml", "Makefile"],
  mdx: {
    remarkPlugins: [
      remarkMdxDisableExplicitJsx,
      remarkGfm,
      remarkDirective,
      remarkAdmonitions,
    ],
    rehypePlugins: [[rehypeImgSize, { dir: "public" }], rehypeSlug],
  },
});
