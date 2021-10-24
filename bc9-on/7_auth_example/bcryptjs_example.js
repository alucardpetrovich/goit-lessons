const bcryptjs = require("bcryptjs");
const crypto = require("crypto");

async function main() {
  const salt = await bcryptjs.genSalt(10);
  const hash = await bcryptjs.hash("qwerty", salt);

  console.log("salt", salt);
  console.log("hash", hash);
}
main();

const hash = crypto.createHash("sha256");
const salt = "asdfasfas";
const hashStr = hash.update("qwerty" + salt).digest("base64");

console.log("hashStr", hashStr);
