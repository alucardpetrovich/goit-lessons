const fs = require("fs");
const FsPromises = fs.promises;
const util = require("util");
const path = require("path");

// fs.writeFile("test.txt", "hello world", (err) => {
//   if (err) throw err;

//   fs.readFile("test.txt", (err) => {
//     if (err) throw err;

//     fs.readdir("es6_modules", (err) => {
//       if (err) throw err;
//     });
//   });
//   console.log("file was created");
// });

// fs.writeFileSync("test.txt", "hello world");

// console.log(fs.readFileSync("test.txt"));

async function main() {
  await FsPromises.writeFile("test.txt", "hello world");

  const filepath = path.join(__dirname, "../../package.json");

  console.log(await FsPromises.readFile(filepath, "utf-8"));

  // const writeFilePromise = util.promisify(fs.writeFile.bind(fs));
  // await writeFilePromise("test.txt", "hello world");
}
main();
