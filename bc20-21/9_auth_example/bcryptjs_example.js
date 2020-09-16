const bcryptjs = require("bcryptjs");

async function main() {
  // 1. salt generated
  // 2. password + salt
  // 3. create hash
  const salt = await bcryptjs.genSalt(6);
  console.log(salt);

  // console.log(await bcryptjs.hash("qwerty", '$2a$06$OdeUJuyrf7TO9PKmTUhzMO'));

  // console.log(
  //   await bcryptjs.compare(
  //     "qwerty",
  //     "$2a$06$TWkWQXiTAiA143.RaJgUJOn0bB2NeQIeCn0a7eYKtnEKxg7B2L7na"
  //   )
  // );
}
main();
