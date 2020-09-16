const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  host: "localhost",
  port: 5428,
  username: "xpel_distributor",
  database: "xpel_distributor",
  password: "qwerty",
  dialect: "postgres",
  logging: false,
});

async function main() {
  await sequelize.authenticate();

  // table name -> Users
  const UserModel = sequelize.define("User", {
    username: { type: Sequelize.STRING, allowNull: false },
    age: { type: Sequelize.SMALLINT, allowNull: false },
  });

  await sequelize.sync();

  // await UserModel.create({
  //   username: "First",
  //   age: 35,
  // });

  // await UserModel.update({ username: "updated" }, { where: { age: 35 } });

  await UserModel.destroy({ where: { username: "updated" } });

  console.log(
    await UserModel.findAll({
      where: {
        age: 35,
      },
    })
  );
}
main();
