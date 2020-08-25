const fs = require("fs");
const path = require("path");

// fs.writeFileSync("example.txt", "hello world");
// fs.writeFile("example.txt", "hello world", (err) => {
//   if (err) throw new Error(err);
//   // console.log(err);

//   fs.readdir("common_js", (err, data) => {
//     if (err) throw new Error(err);

//     console.log(data);
//   });
// });

async function main() {
  // fs example
  await fs.promises.writeFile("example.txt", "hello world");
  const dirFiles = await fs.promises.readdir("common_js");
  const packageJson = await fs.promises.readFile("package.json", "utf-8");
  console.log(packageJson);

  // path example
  console.log(path.join(__dirname, "../../main.js"));
  console.log(path.parse("/Users/punisher/work/goit-lessons/main.js"));
}
main();
