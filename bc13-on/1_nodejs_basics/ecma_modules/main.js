import * as child from "./child.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log("__dirname", __dirname);

console.log(child);
