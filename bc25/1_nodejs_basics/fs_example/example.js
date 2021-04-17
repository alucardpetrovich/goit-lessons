const fs = require("fs");
const path = require("path");
const FsPromises = fs.promises;

// 1. Create
// fs.writeFile("test.json", '{ "hello": "world" }', (err) => {
//   if (err) throw err;

//   console.log("Write file finished successfully");
// });

// fs.writeFileSync("test.json", '{ "hello": "world" }');

// async function main() {
//   await FsPromises.writeFile("test.json", '{ "hello": "world" }');
//   console.log("After await");
// }
// main();
// console.log("after async function");

// 2. Read
// console.log(fs.readFileSync("test.json", "utf-8"));
// console.log(fs.readFileSync('../test.json', 'utf-8'));
// console.log(fs.readdirSync("inner"));

// 3. Update
// fs.appendFileSync("test.json", "hello");

// 4. Delete
// fs.unlinkSync("test.json");

// DO NOT DO THIS!!!!
// `${__dirname}/${filename}`;

// console.log(path.join(__dirname, "../../../package.json"));
// console.log(path.parse(__filename));
// console.log(path.extname(__filename));

// const writeStream = fs.createWriteStream("text.txt");
// const imageReadStream = fs.createReadStream("animation.gif");
// const imageWriteStream = fs.createWriteStream("animation_dupe.gif");

// setInterval(() => {
//   writeStream.write("hello\n");
// }, 1000);
// imageReadStream.pipe(imageWriteStream);
