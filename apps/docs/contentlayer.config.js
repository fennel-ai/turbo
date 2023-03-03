import { spawn } from "node:child_process";
import { defineDocumentType } from "contentlayer/source-files";
import { makeSource } from "contentlayer/source-remote-files";
import remarkGfm from "remark-gfm";
import remarkMdxDisableExplicitJsx from "remark-mdx-disable-explicit-jsx";
import remarkDirective from "remark-directive";
import rehypeImgSize from "rehype-img-size";
import rehypeSlug from "rehype-slug";
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
  filePathPattern: "pages/**/*.md",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The page title",
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
    order: {
      type: "number",
      description: "The order of the page in the navigation.",
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => post._raw.flattenedPath.replace(/pages\/?/, ""),
    },
    section: {
      type: "string",
      resolve: (post) => post._raw.sourceFileDir.replace(/pages\/?/, ""),
    },
  },
}));

const runBashCommand = (command) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, [], { shell: true });

    child.stdout.setEncoding("utf8");
    child.stdout.on("data", (data) => process.stdout.write(data));

    child.stderr.setEncoding("utf8");
    child.stderr.on("data", (data) => process.stderr.write(data));

    child.on("close", function (code) {
      if (code === 0) {
        resolve(void 0);
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
  });

const REPO_URL = "https://github.com/fennel-ai/documentation-content.git";
const CONTENT_DIR = ".content";
const POLL = 0; // 1000 * 60

const syncContent = async () => {
  let cancelled = false;
  let syncInterval;

  const syncLoop = async () => {
    console.log(`Pulling content from ${REPO_URL}`);

    await runBashCommand(`
      if [ -d  "${CONTENT_DIR}" ];
        then
          cd "${CONTENT_DIR}"; git pull;
        else
          git clone --depth 1 --single-branch ${REPO_URL} ${CONTENT_DIR};
      fi
    `);

    if (cancelled || !POLL) return;

    syncInterval = setTimeout(syncLoop, 3000);
  };

  await syncLoop();

  return () => {
    cancelled = true;
    clearTimeout(syncInterval);
  };
};

export default makeSource({
  syncFiles: syncContent,
  contentDirPath: CONTENT_DIR,
  documentTypes: [DocPage, Section],
  contentDirExclude: ['examples', '.git'],
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
