import path from "node:path";
import { globbyStream as globby } from "globby";
import fs from "fs-extra";

const cleanPath = (slug) => slug.replace(/.md|.mdx/g, "");

export const createManifest = async (dir) => {
  let manifest = {};
  for await (const file of globby(`**/*.(md|mdx)`, { dot: true, cwd: dir })) {
    const fullPath = path.join(dir, file);
    const slugs = cleanPath(file)
      .split("/")
      .filter((p) => p !== "README");

    const key = slugs.join("/") || "/";
	
    manifest[key] = {
      path: fullPath,
      slugs: slugs,
    };
  }

  await fs.writeJSON(path.join(dir, "../", "manifest.json"), manifest);
};
