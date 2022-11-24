import bcrypt from "bcryptjs";

async function main() {
  // console.log(await bcrypt.hash("qwerty", 6));

  const salt = "$2a$06$.3VcSkDc719M0TioCcJYeu";

  console.log(salt);
  console.log(await bcrypt.hash("qwerty", salt));

  console.log(
    await bcrypt.compare(
      "qwerty",
      "$2a$06$/zEy374MB2/6b1wju/ZJ8.UOstzZFKNLVI31Px2Btponhgkyn8s0G"
    )
  );
}
main();
