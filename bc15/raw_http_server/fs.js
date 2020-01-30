const fs = require("fs");
const { promises: fsPromises } = fs;
const path = require("path");
// import path from 'path'

// const packagePath = path.join(__dirname, "package.json");
// console.log("path", packagePath);

///// read file functionality

// const packageContent = fs.readFileSync(packagePath, "utf8");
// fs.readFile(packagePath, "utf8", (err, data) => {
//   if (err) throw err;

//   console.log("data", data);
//   fs.writeFile(packagePath, data, err => {
//     if (err) throw err;
//   });
// });
// fsPromises.readFile(packagePath, "utf8").then(data => {
//   // console.log(data);
// });

////// write file functionality
const testPath = path.join(__dirname, "../test.txt");

// console.log(testPath);
// fs.writeFileSync(testPath, "test", "utf8");

///// append file functionality
// fs.appendFileSync(testPath, "hello", "utf8");

//// file removal

// fs.unlinkSync(testPath);

//// file duplication with streams

const testReadStream = fs.createReadStream(testPath);

const testCopyPath = path.join(__dirname, "testCopy.txt");
const testCopyWriteStream = fs.createWriteStream(testCopyPath);

testReadStream.pipe(testCopyWriteStream);

// console.log(packageContent);
