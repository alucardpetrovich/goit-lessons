import { hello } from "./child.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

hello();
const __dirname = dirname(fileURLToPath(import.meta.url));

console.log("__dirname", __dirname);
