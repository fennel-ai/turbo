import { Octokit } from "octokit";
import { Readable } from "node:stream";
import path from 'node:path';
import fs from "fs-extra";
import tar from "tar-fs";
import gunzip from "gunzip-maybe";

const fetchContent = async (token, dir, versions) =>
  new Promise(async (resolve, reject) => {
    if (!token) {
      reject("No github token provided.");
    }

    const octo = new Octokit({
      auth: token,
    });

    for (const version of versions) {
        // Fetch the repo from main
        // (this contains the versions.yml we need to fetch the remaining versions)
        const outputDir = path.join(dir, version.name);

        // Clear the content dir, this also created the dir if it doesn't exist.
        await fs.emptyDir(outputDir);

        const { data } = await octo.request(
            "GET /repos/{owner}/{repo}/tarball/{?ref}",
            {
                owner: "fennel-ai",
                repo: "client",
                ref: version.head,
            }
        );

        const stream = new Readable();
        stream._read = () => {};

        stream.push(Buffer.from(data));
        stream.push(null);

        stream.pipe(gunzip()).pipe(
            tar.extract(".tmp", {
            finish: () => {
                // TODO: THis isn't the most efficient right now, but will need changing either way to support incremental builds
                // Will circle back when working on support for incremental builds.
                fs.moveSync(".tmp/docs", outputDir, { overwrite: true });
                fs.rmSync(".tmp", { recursive: true });
                resolve();
            },
            strip: 1, // Here we strip the first path segment so that the files are placed directly into outputDir instead of `{outputDir}/repo_name_with_hash/*`
            })
        );
    }
  });

export default fetchContent;