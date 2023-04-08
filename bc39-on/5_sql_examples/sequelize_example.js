const { Sequelize, BIGINT, STRING, DATE } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

async function main() {
  const sequelize = new Sequelize(process.env.DB_URL);
  await sequelize.authenticate();

  const User = sequelize.define(
    "User",
    {
      id: { type: BIGINT, primaryKey: true, autoIncrement: true },
      username: { type: STRING, allowNull: true },
      email: { type: STRING, allowNull: false, unique: true },
      passwordHash: { type: STRING, allowNull: false, field: "password_hash" },
      createdAt: { type: DATE, allowNull: false, field: "created_at" },
      updatedAt: { type: DATE, allowNull: false, field: "updated_at" },
    },
    { tableName: "users" }
  );

  // await User.create({
  //   username: "test",
  //   email: "hello@email.com",
  //   passwordHash: "qertgregadgd",
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // });

  // console.log(await User.findAll({ where: { username: "test" } }));

  // await User.update({ username: "updated" }, { where: { id: 1 } });

  await User.destroy({ where: { id: 1 } });

  // await User.sync({ force: true });

  console.log("Connected to database");
}
main();
