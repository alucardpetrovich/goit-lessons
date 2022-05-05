const { Sequelize, DataTypes } = require("sequelize");
const getUserModel = require("./models/user");

const connection = new Sequelize(
  "postgresql://bc13_on:qwerty@localhost:5400/bc13_on"
);

async function main() {
  await connection.authenticate();
  console.log("Connected to database");

  const UserModel = getUserModel(connection, DataTypes);

  // C - Create
  // await UserModel.create({
  //   firstName: "second",
  //   lastName: "last",
  //   email: "second@email.com",
  // });

  // R - Read
  // console.log(await UserModel.findAll({ where: { firstName: "second" } }));
  console.log(await UserModel.findByPk(1));

  // U - Update
  // await UserModel.update({ firstName: "updated" }, { where: { id: 1 } });

  // D - Delete
  await UserModel.destroy({ where: { id: 1 } });
}
main();
