import * as bcrypt from "bcryptjs";

async function main() {
  const salt = "$2a$12$pAMsAniNUAsmeQb7b3ZkyO";
  const hash = await bcrypt.hash("qwerty", salt);
  console.log(salt);
  console.log(hash);

  console.log(await bcrypt.compare("qwerty1", hash));
}
main();
