const fs = require("fs");
const { promises: fsPromises } = fs;

// fs.writeFile("example.txt", "hello world", (err) => {
//   if (err) throw err;

//   console.log("file written successfully");
// });

fs.readFile("example.txt", "utf-8", (err, data) => {
  if (err) throw err;

  fs.readdir("node_modules", (err, data) => {
    if (err) throw err;

    console.log(data);

    fs.readFile("dependency.js", "utf-8", (err, data) => {
      if (err) throw err;

      console.log(data);
    });
  });

  console.log("file data ---------->", data);
});

// fs.writeFileSync("example.txt", "hello world");

async function main() {
  const exampleData = await fsPromises.readFile("example.txt", "utf-8");
  console.log("file data ---------->", exampleData);

  const filesInNodeModules = await fsPromises.readdir('node_modules');
  console.log(filesInNodeModules);

  const depData = await fsPromises.readFile("dependency.js", "utf-8");
  console.log(depData);
}
main();
