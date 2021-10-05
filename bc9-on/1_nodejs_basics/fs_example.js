const fs = require("fs");
const FsPromises = fs.promises;

// console.log(fs.readFileSync("child.js", "utf-8"));

// fs.readFile("child.js", "utf-8", (err, data) => {
//   if (err) throw err;

//   console.log("data", data);

//   fs.readdir("commonjs", (err, files) => {
//     if (err) throw err;

//     console.log("files", files);
//   });
// });

async function main() {
  // const childJsContent = await FsPromises.readFile("child.js", "utf-8");
  // const commonjsFiles = await FsPromises.readdir("commonjs");

  // await FsPromises.writeFile("text.txt", "hello world");
  // await FsPromises.appendFile("text.txt", "\nhello world");
  // await FsPromises.unlink("text.txt");
  // await FsPromises.rmdir("test", { recursive: true });

  // console.log(childJsContent);
  // console.log(commonjsFiles);
}
main();
