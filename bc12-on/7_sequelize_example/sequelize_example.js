const { Sequelize, STRING } = require("sequelize");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, ".env") });

async function main() {
  const connection = new Sequelize(
    process.env.POSTGRES_URI
    // {logging: false}
  );
  await connection.authenticate();

  // User => Users
  const UserModel = connection.define("User", {
    username: { type: STRING, allowNull: false },
    email: { type: STRING, allowNull: false, unique: true },
    password: { type: STRING, allowNull: false },
  });
  await UserModel.sync();

  // await UserModel.create({
  //   username: "first",
  //   email: "hello@email.com",
  //   password: "qwerty",
  // });

  // console.log(
  //   await UserModel.findAll({
  //     where: { id: 1 },
  //     order: [["username", "DESC"]],
  //     offset: 0,
  //     limit: 10,
  //   })
  // );

  // await UserModel.update({ username: "updated" }, { where: { id: 1 } });
  // await UserModel.destroy({ where: { id: 1 } });

  console.log("finished");
  process.exit(0);
}
main();
