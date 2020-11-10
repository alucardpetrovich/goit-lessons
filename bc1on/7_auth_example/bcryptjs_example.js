const bcryptjs = require("bcryptjs");
const passport = require("passport");

async function main() {
  const password = "qwerty";
  const salt = "$2a$10$fnzZAAIAKYjFzsoXTaJOI.";

  const hash = await bcryptjs.hash(password, salt);
  console.log(hash);

  const isPasswordValid = await bcryptjs.compare(password, hash);
  console.log("isPasswordValid", isPasswordValid);
}
main();
