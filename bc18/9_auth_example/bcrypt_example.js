const bcryptjs = require("bcryptjs");

async function main() {
  const hash = await bcryptjs.hash("qwerty", 5);
  console.log(hash);

  const isRightPassword = await bcryptjs.compare("asdfasdfasdf", hash);
  console.log("isRightPassword :>> ", isRightPassword);
}

main();
