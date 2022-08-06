const fs = require("fs");
const util = require("util");
const FsPromises = fs.promises;
const path = require("path");

// console.log(fs.readFileSync("esm/package.json", "utf-8"));
// utf-8, ascii, base64
// fs.readFile("esm/package.json", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
//   fs.writeFile("hello.txt", "test", (err) => {
//     if (err) throw err;

//     fs.readdir("esm", (err, files) => {
//       if (err) throw err;

//       console.log(files);
//     });
//   });
// });

async function main() {
  const data = await FsPromises.readFile("esm/package.json", "utf-8");
  console.log(data);

  // await FsPromises.writeFile("hello.txt", "test");
  // await FsPromises.appendFile("hello.txt", "test");
  // await FsPromises.unlink("hello.txt");

  const exists = util.promisify(fs.exists);
  if (await exists("hello.txt")) {
    await FsPromises.unlink("hello.txt");
  }

  const childPath = path.join(__dirname, "esm/child.js");
  await FsPromises.readFile(childPath);

  const files = await FsPromises.readdir("esm");
  console.log(files);
}
main();
