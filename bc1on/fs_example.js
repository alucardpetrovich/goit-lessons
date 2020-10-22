// const fs = require('fs');
const fs = require("fs");
const path = require("path");

// fs.writeFileSync('example.txt', 'helloworld');
// fs.writeFile("example.txt", "helloworld", (err) => {
//   if (err) {
//     throw err;
//   }

//   fs.readFile("example.txt", "utf8", (err, data) => {
// if (err) {
//   throw err;
// }
//     console.log(data);
//   });

//   console.log("written file successfully");
// });

async function main() {
  // await fs.promises.writeFile("example.txt", "helloworld");
  // console.log("written file successfully");
  // const data = await fs.promises.readFile("example.txt", "utf8");
  // const gitignoreContent = await fs.promises.readFile(
  //   path.join(__dirname, "../.gitignore"),
  //   "utf8"
  // );

  console.log(path.parse(__filename));
  // console.log("gitignoreContent", gitignoreContent);

  // console.log("hello");
  // console.log(data);
}
main();
