const fs = require("fs");
const FsPromises = require("fs").promises;

// fs.writeFileSync("hello.txt", "hello world");
// fs.writeFile("hello.txt", "hello world", (err) => {
//   if (err) throw err;

//   fs.readFile("hello.txt", "utf-8", (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   });
// });

async function main() {
  await FsPromises.writeFile("hello.txt", "4A", "latin1");
  const data = await FsPromises.readFile("hello.txt", "utf-8");
  console.log(data);
}
main();
