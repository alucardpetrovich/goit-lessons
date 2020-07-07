const bcryptjs = require("bcryptjs");

const plainPassword = "qwrqefasfsadf";

async function main() {
  const salt = bcryptjs.genSaltSync(10);
  const hash = await bcryptjs.hash("qwrqefasfsadf", salt);

  console.log("salt", salt);
  console.log("hash", hash);

  // console.log(
  //   await bcryptjs.compare(
  //     plainPassword,
  //     "$2a$07$ifKuBHkd2LuZGUud2dYv0Of7TysrcEuh72mqct9xiPolVn9hXBwy2"
  //   )
  // );
}
main();
