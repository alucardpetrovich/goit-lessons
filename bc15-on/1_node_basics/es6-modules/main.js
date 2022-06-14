import { a } from "./child.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

console.log(a);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__filename);
console.log(__dirname);
