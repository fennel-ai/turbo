import { spawn } from "node:child_process";

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

export default runBashCommand;
