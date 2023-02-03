import { Octokit } from "octokit";
import { Readable } from "node:stream";
import { emptyDir } from "fs-extra";
import tar from "tar-fs";
import gunzip from "gunzip-maybe";

export const fetchContents = async (token, dir) => {
  if (!token) {
    throw "Github token not provided to withGitDocs";
  }

  const octo = new Octokit({
    auth: token,
  });

  // Clear the content dir, this also created the dir if it doesn't exist.
  await emptyDir(dir);

  // Fetch the repo as a tarball
  const { data } = await octo.request(
    "GET /repos/{owner}/{repo}/tarball/{?ref}",
    {
      owner: "fennel-ai",
      repo: "gitbook",
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
    tar.extract(dir, {
      strip: 1, // Here we strip the first path segment so that the files are placed directly into the content dir instead of `content_dir/repo_name_with_hash/*`
    })
  );
};
