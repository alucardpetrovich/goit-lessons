const crypto = require("crypto");
const bcryptjs = require("bcryptjs");

// SHA-256
// console.log(crypto.createHash("sha256").update("qwerty").digest("hex"));

async function main() {
  // console.log(await bcryptjs.genSalt(10));

  console.log(await bcryptjs.hash("qwerty", "$2a$10$qORblCPBeddlvGFWFbXL1u"));
  // console.log(
  //   await bcryptjs.compare(
  //     "qwerty",
  //     "$2a$10$LXOdi4t95Noqk35LtQVZ8.bVwQF0xAYd3t.44QXQZzXfVIggOytiq"
  //   )
  // );
}
main();
