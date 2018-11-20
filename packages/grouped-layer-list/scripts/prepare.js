const fs = require("fs");

const { exec } = require("child_process");

function execPromise(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stdout, stderr });
      } else {
        resolve({ error, stdout, stderr });
      }
    });
  });
}

(async () => {
  await execPromise("tsc --target es2015 --module es2015 --declaration");
  for (const fn of ["main", "metadataUtils"]) {
    await fs.promises.rename(`dist/${fn}.js`, `dist/${fn}.mjs`)
  }
  await execPromise("tsc --target es5 --module commonjs");
})();
