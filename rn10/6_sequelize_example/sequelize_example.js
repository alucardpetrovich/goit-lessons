const Sequelize = require("sequelize");

const dbConnection = new Sequelize({
  // your connection parameters
  dialect: "postgres",
  host: "",
  username: "",
  password: "",
  database: "",
});

async function main() {
  await dbConnection.authenticate();
  console.log("connected to DB");

  // table name -> Users
  const userModel = dbConnection.define(
    "User",
    {
      username: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
    },
    {
      paranoid: true,
    }
  );
  await dbConnection.sync({ force: true });

  await userModel.create({
    username: "hello",
    email: "hello1@example.com",
    password: "qwerty",
  });

  // await userModel.update(
  //   { username: "updated username" },
  //   { where: { password: "qwerty" } }
  // );

  await userModel.destroy({ where: { email: "hello@example.com" } });

  console.log(await userModel.findAll({ where: { password: "qwerty" } }));
}

main();
