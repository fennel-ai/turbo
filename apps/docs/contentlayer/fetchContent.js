import { Octokit } from "octokit";
import { Readable } from "node:stream";
import fs from "fs-extra";
import tar from "tar-fs";
import gunzip from "gunzip-maybe";

const fetchContent = async (token, dir) =>
  new Promise(async (resolve, reject) => {
    if (!token) {
      reject("No github token provided.");
    }

    const octo = new Octokit({
      auth: token,
    });

    // Clear the content dir, this also created the dir if it doesn't exist.
    await fs.emptyDir(dir);

    // Fetch the repo as a tarball
    const { data } = await octo.request(
      "GET /repos/{owner}/{repo}/tarball/{?ref}",
      {
        owner: "fennel-ai",
        repo: "client",
        ref: "main",
      }
    );

    // Create a readable stream from the tar blob
    const stream = new Readable();
    stream._read = () => {};

    stream.push(Buffer.from(data));
    stream.push(null);

    // gunzip it and then extract.
    stream.pipe(gunzip()).pipe(
      tar.extract('.tmp', {
        finish: () => {
			// TODO: THis isn't the most efficient right now, but will need changing either way to support incremental builds
			// Will circle back when working on support for incremental builds.
			fs.moveSync('.tmp/docs', dir, { overwrite: true });
			fs.rmSync('.tmp', { recursive: true });
			resolve();
		},
        strip: 1, // Here we strip the first path segment so that the files are placed directly into the content dir instead of `content_dir/repo_name_with_hash/*`
      })
    );
  });

export default fetchContent;