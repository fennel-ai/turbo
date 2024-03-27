import { Octokit } from "octokit";
import { Readable } from "node:stream";
import path from 'node:path';
import fs from "fs-extra";
import { globby } from 'globby';
import tar from "tar-fs";
import gunzip from "gunzip-maybe";

const moveFiles = async (patterns, src, target) => {
   const files = await globby(
     patterns.map((pattern) => path.join(src, pattern))
   );
   
   for await (const file of files) {
        const targetPath = path.join(target, path.relative(src, file));
        await fs.move(file, targetPath, { overwrite: true });
      }
};

const fetchContent = async (token, dir, versions) => {
    if (!token) {
        reject("No github token provided.");
    }

    const octo = new Octokit({
      auth: token,
    });

    const processVersion = async (version) => {
        const outputDir = path.join(dir, version.name);
        const publicDir = path.join(process.cwd(), 'public');
        const tmpDir = path.join('.tmp', version.head);

        await fs.emptyDir(outputDir);
        await fs.ensureDir(tmpDir, { recursive: true });

        const { data } = await octo.request(
            "GET /repos/{owner}/{repo}/tarball/{ref}",
            {
                owner: "fennel-ai",
                repo: "client",
                ref: version.head,
            }
        );

        const stream = new Readable({
            read() {
                this.push(Buffer.from(data));
                this.push(null);
            },
        });

        return new Promise((resolve, reject) => 
            stream
                .pipe(gunzip())
                .pipe(
                    tar.extract(tmpDir, {
                        finish: async () => {
                          // Move source content and config files to _content/{version.name}
                          await moveFiles(
                            [
                              "pages/**",
                              "examples/**",
                              "api.yml",
                              "index.yml",
                              "versions.yml",
                            ],
                            path.join(tmpDir, "docs"),
                            outputDir
                          );

                          // Move assets related files to public/{version.name}
                          await moveFiles(
                            ["assets/**"],
                            path.join(tmpDir, "docs"),
                            path.join(publicDir, version.name)
                          );

                          // Clean up
                          await fs.rm(tmpDir, { recursive: true });
                          resolve();
                        },
                        strip: 1, // Here we strip the first path segment so that the files are placed directly into outputDir instead of `{outputDir}/repo_name_with_hash/*`
                    })
                )
                .on('error', reject)
        )
    };

    // Create .tmp if not present
    await fs.ensureDir(".tmp");

    // Process all versions
    await Promise.all(versions.map(processVersion));

    // Clean up
    await fs.rm(".tmp", { recursive: true });
};

export default fetchContent;