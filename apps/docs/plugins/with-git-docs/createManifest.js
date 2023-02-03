import path from "node:path";
import { globbyStream as globby } from "globby";
import fs from "fs-extra";
import matter from 'gray-matter';

const cleanPath = (slug) => slug.replace(/.md|.mdx/g, "");

export const createManifest = async (dir) => {
  let manifest = {};
  for await (const file of globby(`**/*.(md|mdx)`, { dot: true, cwd: dir })) {
    const fullPath = path.join(dir, file);
    const slugs = cleanPath(file)
      .split("/")
      .filter((p) => p !== "README");

    const key = slugs.join("/") || "/";

	const contents = await fs.readFile(fullPath);
	const { data: frontmatter, excerpt: title } = matter(contents, { excerpt: true, excerpt_separator: "\n\n" })

    manifest[key] = {
      path: fullPath,
      slugs: slugs,
	  frontmatter,
	  title: title.replace('\n', ''),
    };
  }

  await fs.writeJSON(path.join(dir, "../", "manifest.json"), manifest);
};
