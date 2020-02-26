const fs = require("fs");

// fs.writeFile("text.txt", "Hello fs", () => {
//   console.log("file created");
// });

// fs.appendFileSync("text1.txt", "\nnew data");
// fs.unlink("text1.txt", err => {
//   console.log(err);

//   console.log("hello");
// });

const fileContent = fs.readFileSync("text.txt", "utf8");

// console.log(fs.statSync("text.txt"));

// console.log(fileContent);

fs.createReadStream('text.txt');


