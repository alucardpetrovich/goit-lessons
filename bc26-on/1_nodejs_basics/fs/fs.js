const fs = require("fs");
const path = require("path");

fs.readFile(path.join(__dirname, "../esm/package.json"), (err, data) => {
  if (err) throw err;

  console.log("data", data);
});

console.log(fs.readFileSync(path.join(__dirname, "../esm/package.json")));

async function main() {
  console.log(
    await fs.promises.readFile(path.join(__dirname, "../esm/package.json"))
  );
  console.log(await fs.promises.readdir(path.join(__dirname, "../commonjs")));
  await fs.promises.unlink("test.txt");
}
main();
