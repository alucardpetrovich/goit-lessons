const Sequelize = require("sequelize");

main();

async function main() {
  const connection = new Sequelize({
    host: "localhost",
    database: "bc15_test",
    username: "bc15_test",
    password: "qwerty",
    dialect: "postgres",
    logging: true
  });

  await connection.authenticate();

  const UserModel = connection.define("User", {
    name: { type: Sequelize.STRING, allowNull: false },
    surname: { type: Sequelize.STRING, allowNull: false },
    age: { type: Sequelize.STRING, allowNull: false },
    quantity: { type: Sequelize.INTEGER }
  });

  await connection.sync();

  // await UserModel.create({
  //   name: "John",
  //   surname: "Doe",
  //   age: 10,
  //   quantity: 1
  // });

  console.log(
    await UserModel.findOne({
      where: { name: "John" }
    })
  );
}
