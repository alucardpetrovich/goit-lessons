import path from "path";

export function getPaths(fileUrl) {
  const { pathname } = new URL(fileUrl);
  const __filename = pathname;
  const __dirname = path.dirname(pathname);

  return { __filename, __dirname };
}
