import { readFileSync, readFile, writeFile, promises as FsPromises } from "fs";
import { extname, join, parse, resolve } from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

// console.log(readFileSync("package.json", "utf-8"));

// writeFile("test.txt", "hello", (err) => {
//   if (err) throw err;

//   readFile("test.txt", "utf-8", (err, data) => {
//     if (err) throw err;

//     console.log(data);
//   });
// });

async function main() {
  // await FsPromises.writeFile("test.txt", "hello");
  // await FsPromises.appendFile("test.txt", " hi there");
  // console.log(await FsPromises.readFile("test.txt", "utf-8"));
  // await FsPromises.unlink("test.txt");

  const __dirname = dirname(fileURLToPath(import.meta.url));
  // console.log(join(__dirname, "esm/main.js"));
  // console.log(__dirname + "/esm/main.js");
  // console.log(resolve("./esm/main.js"));
  console.log(extname(fileURLToPath(import.meta.url)));
}
main();
