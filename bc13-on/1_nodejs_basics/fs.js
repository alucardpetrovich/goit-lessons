const fs = require("fs");
const path = require("path");
const FsPromises = fs.promises;

// fs.mkdir("test", (err) => {
//   if (err) throw err;

//   fs.writeFile("test/index.html", "<b>Hello world</b>", (err) => {
//     if (err) throw err;

//     fs.readFile("test/index.html", (err, data) => {
//       if (err) throw err;

//       console.log(data);
//     });
//   });
// });

async function main() {
  await FsPromises.mkdir("test", { recursive: true });
  await FsPromises.writeFile("test/index.html", "<b>Hello world</b>");
  const data = await FsPromises.readFile("test/index.html", "utf-8");
  console.log(data);

  // Windows
  // C:\\hello\world
  // Linux/macOS
  // /Users/punisher/hello/world

  const index = path.join(__dirname, "test/index.html");
  console.log("index path", index);
}
main();
