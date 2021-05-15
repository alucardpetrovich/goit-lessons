const bcryptjs = require("bcryptjs");

async function main() {
  // const salt = bcryptjs.genSaltSync();
  // console.log(salt);
  const hash = await bcryptjs.hash("qwerty", "$2a$10$cwIjW..x8UBBEMiiBQ3m1u");
  // console.log("hash", hash);
  console.log(
    await bcryptjs.compare(
      "qwerty1",
      "$2a$10$cwIjW..x8UBBEMiiBQ3m1uRLmNmPCyqn8IZVyDImreHeraoxF4vQK"
    )
  );
}
main();
