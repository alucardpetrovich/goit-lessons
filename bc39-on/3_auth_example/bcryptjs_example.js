const bcrypt = require("bcryptjs");

async function main() {
  const password = "qwerty";
  const hash = await bcrypt.hash(password, 6);

  console.log(await bcrypt.compare(password + "1", hash));

  // console.log(salt);
  // console.log(hash);
}
main();
