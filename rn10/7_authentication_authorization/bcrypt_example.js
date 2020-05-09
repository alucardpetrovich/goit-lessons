const bcryptjs = require("bcryptjs");

async function main() {
  const targetPassword = "qwerty";

  const targetPasswordHash = await bcryptjs.hash(targetPassword, 4);
  console.log(await bcryptjs.compare("12345", targetPasswordHash));
}

main();
