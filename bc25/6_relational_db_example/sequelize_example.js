const Sequelize = require("sequelize");

const connection = new Sequelize({
  host: "", // host of the database
  database: "", // name of the DB to connect
  dialect: "", // DB dialect, one of 'mysql' | 'mariadb' | 'postgres' | 'mssql'
  username: "", // DB user which will be used for connection to DB
  password: "", // DB user's password
  logging: false,
});

async function main() {
  await connection.authenticate();

  // table -> Users
  const UserModel = connection.define("User", {
    username: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false },
  });
  await UserModel.sync();

  // await UserModel.create({
  //   username: "hello",
  //   email: "hello@email.com",
  //   password: "qwerty",
  // });
  // console.log(await UserModel.findAll({ where: { username: "hello" } }));
  // console.log(await UserModel.findOne({ where: { username: "hello" } }));

  // await UserModel.update(
  //   { username: "updated" },
  //   { where: { id: 1 }, limit: 1 }
  // );

  // await UserModel.destroy({ where: { id: 1 }, limit: 1 });
}
main();
