// import { promises as FsPromises } from "fs";
import { promisify } from "util";
// import { writeFileSync, writeFile, readFile, rename } from "fs";
import fs from "fs";

// const childJsContent = await FsPromises.readFile("child.js", "utf-8");
// console.log(childJsContent);

// await FsPromises.writeFile("text.txt", "1243534");
// await FsPromises.appendFile("text.txt", "\n new line");
// await FsPromises.rename("text.txt", "new_name.txt");
// await FsPromises.unlink("new_name.txt");
// writeFileSync("text.txt", "asdfasfa");

// writeFile("text.txt", "sdfadfds", (err) => {
//   readFile("text.txt", () => {
//     rename("text.txt", "new_text.txt", () => {});
//   });
// });

// const renamePromise = promisify(fs.rename.bind(fs));

await renamePromise("text.txt", "new.txt");
