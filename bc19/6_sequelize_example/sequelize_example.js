const Sequelize = require("sequelize");

async function main() {
  const connection = new Sequelize({
    username: "bc19_example",
    password: "plaintextpassword",
    host: "localhost",
    database: "bc19_example",
    port: 5430,
    dialect: "postgres",
  });

  await connection.authenticate();

  // table name => Users
  const User = connection.define("User", {
    name: { type: Sequelize.STRING, allowNull: false },
    age: { type: Sequelize.INTEGER, allowNull: false },
  });

  await connection.sync();

  // const newUser = await User.create({ name: "first", age: 18 });
  // console.log(await User.findAll());
  // await User.update({ name: "updated" }, { where: { name: "first" } });

  await User.destroy({ where: { id: 1 } });

  console.log(await User.findAll());
}
main();
