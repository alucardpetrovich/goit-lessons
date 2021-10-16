import { createConnection } from "typeorm";
import { UserEntity } from "./user.entity";

async function main() {
  const conn = await createConnection({
    url: "postgresql://e_sportstats:qwerty@localhost:5421/test",
    type: "postgres",
    synchronize: true,
    entities: [UserEntity],
  });
  console.log("Successfully connected to DB");
  // console.log(await conn.query(`SELECT 1 + 1 AS result`));
  const usersRepository = conn.getRepository(UserEntity);

  // await usersRepository.save({
  //   username: "hello",
  //   email: "hello@email.com",
  // });

  // console.log(await usersRepository.findOne(1));
  // console.log(await usersRepository.find());

  // await usersRepository.update({ id: 1 }, { username: "updated" });

  // await usersRepository.delete(1);
}
main();
