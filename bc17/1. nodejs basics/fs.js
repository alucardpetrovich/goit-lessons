const fs = require("fs");
const path = require("path");
const { promises: fsPromises } = fs;

// 1. in callback first argument is error
// fs.writeFile("example.txt", "first file creation", err => {
//   if (err) {
//     console.log(err);
//   }

//   fs.readFile("example.txt", "utf-8", (err, data) => {
//     console.log(data);

//     fs.appendFile("example.txt", "second write", err => {
//       if (err) {
//         console.log(err);
//       }
//     });
//   });
// });

// fsPromises
//   .writeFile("example.txt", "rewrite")
//   .then(() => {
//     return fsPromises.readFile("example.txt", "utf-8");
//   })
//   .then(data => {
//     console.log(data);

//     return fsPromises.appendFile("example.txt", "second write");
//   });
// fs.writeFileSync

// async function main() {
//   await fsPromises.writeFile("example.txt", "rewrite");

//   const data = await fsPromises.readFile("example.txt", "utf-8");
//   console.log(data);

//   await fsPromises.appendFile("example.txt", "second write");
// }

// async function main2() {
//   const pathToHigherPackageJson = path.join(__dirname, "../../package.json");
//   // C:\\asdfsafs\package.json

//   console.log(await fsPromises.readFile(pathToHigherPackageJson, "utf-8"));
// }

const obj = { a: 1, b: "string" };
const json = JSON.stringify(obj);

console.log(typeof json);

// main2();
// main();
