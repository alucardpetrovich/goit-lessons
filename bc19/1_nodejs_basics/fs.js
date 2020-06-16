const fs = require("fs");
const { promises: fsPromises } = fs;

const yargsJsContent = fs.readFileSync("yargs.js", "utf-8");
fs.readFile("yargs.js", "utf-8", (err, data) => {
  console.log("data", data);
});

// fs.writeFileSync("pack.json", "hello");
// fs.mkdirSync("hello_folder");
// // console.log(yargsJsContent);

// fs.mkdir("new_folder", (err) => {
//   if (err) throw err;

//   fs.mkdir("new_folder/nested_folder", (err) => {
//     if (err) throw err;

//     fs.writeFile("new_folder/nested_folder/text.txt", "hello", (err) => {
//       if (err) throw err;
//     });
//   });
// });

// async function main() {
//   try {
//     await fsPromises.mkdir("new_folder");
//     await fsPromises.mkdir("new_folder/nested_folder");
//     await fsPromises.writeFile("new_folder/nested_folder/text.txt", "hello");
//   } catch (err) {
//     throw err;
//   }
// }
// main();

// console.log(fsPromises.mkdir("new_folder"));
