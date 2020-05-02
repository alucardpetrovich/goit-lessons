const fs = require("fs");
const { promises: fsPromises } = fs;
const path = require("path");

// fs.writeFileSync("new.txt", "hello world\n");
// fs.writeFile("new.txt", "hello world\n", (err) => {
//   if (err) throw err;

//   fs.appendFile("new.txt", "hello again\n", (err) => {
//     if (err) throw err;

//     fs.readFile("new.txt", "utf8", (err, data) => {
//       if (err) throw err;

//       fs.unlink("new.txt", (err) => {
//         if (err) throw err;
//       });

//       console.log("data", data);
//     });
//   });

//   console.log("successfully created file");
// });

async function main() {
  try {
    await fsPromises.writeFile("new.txt", "hello world\n");
    await fsPromises.appendFile("new.txt", "hello again\n");
    const fileContent = await fsPromises.readFile("new.txt", "utf8");
    await fsPromises.unlink("new.txt");

    const packContent = await fsPromises.readFile(
      path.join(__dirname, "../../pack.json"),
      "utf-8"
    );

    console.log("data", fileContent);
    console.log("join result", path.join(__dirname, "../../pack.json"));
    console.log("pack content", packContent);
  } catch (err) {
    console.log(err);
  }
}

main();
