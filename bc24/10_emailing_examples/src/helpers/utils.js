import path from "path";
import { fileURLToPath } from "url";

export function getPaths(fileUrl) {
  const __filename = fileURLToPath(fileUrl);
  const __dirname = path.dirname(__filename);

  return { __filename, __dirname };
}
