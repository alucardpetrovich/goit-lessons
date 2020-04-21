const fs = require("fs");
const path = require("path");

// const fileContent = fs.readFileSync("import.js", "utf8");
// fs.readFile("import.js", "utf8", (err, data) => {
//   if (err) throw err;

//   console.log("err", err);

//   console.log(data);
// });

// fs.mkdir("test", (err) => {
//   if (err) throw err;

//   fs.writeFile("test/file.txt", "hello world", (err) => {
//     if (err) throw err;

//     fs.appendFile("test/file.txt", "\n hello again", (err) => {
//       if (err) throw err;
//     });
//   });
// });

// const { promises: fsPromises } = fs;

// async function main() {
//   try {
//     await fsPromises.mkdir("test");
//     await fsPromises.writeFile("test/file.txt", "hello world");
//     await fsPromises.appendFile("test/file.txt", "\n hello again");
//   } catch (err) {
//     console.log(err);
//   }
// }

// setTimeout(() => {
//   console.log("2 secs");
// }, 2000);

// setImmediate(() => {
//   console.log("hello");
// });

// ../../
// / \
const packContent = fs.readFileSync(
  path.join(__dirname, "../pack.json"),
  "utf8"
);
console.log(path.join(__dirname, "../pack.json"));
console.log("__dirname", __dirname);
console.log("__filename", __filename);

setTimeout(() => {
  console.log("hello");
  const a = 5;

  setTimeout(() => {
    console.log("inner hello");
  }, 40000);
}, 60000);

// __filename
// __dirname

console.log(packContent);

// main();

// fs.writeFile("test/file.txt", "", (err) => {
//   if (err) throw err;
// });

// console.log(fileContent);
