import * as test from "./child.js";
import { asdfsd } from "./child.js";
import * as url from "url";
import { dirname } from "path";

console.log(test);

// process.exit(0);

/// DOES NOT EXIST IN NODE.JS NATIVE ESM
// console.log("__filename", __filename);
// console.log("__dirname", __dirname);

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log("__dirname", __dirname);
console.log("__filename", __filename);

console.log("cwd", process.cwd());
console.log("process.argv", process.argv);
console.log("process.pid", process.pid);
// console.log("process.env", process.env);
