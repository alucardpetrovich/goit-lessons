const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  host: "",
  database: "",
  dialect: "postgres",
  username: "",
  password: "",
  port: 5432,
});

async function main() {
  await sequelize.authenticate();

  // table name => Examples
  const ExampleModel = sequelize.define("Example", {
    name: { type: Sequelize.STRING, allowNull: false },
    age: { type: Sequelize.INTEGER, allowNull: false },
  });
  await ExampleModel.sync();

  // CRUD

  // 1. C - Create
  // await ExampleModel.create({
  //   name: "heloo",
  //   age: 10,
  // });

  // 2. R - Read
  // console.log(await ExampleModel.findAll({ where: { name: "heloo" } }));

  // 3. U - Update
  // await ExampleModel.update({ name: "updated" }, { where: { id: 1 } });

  // 4. D - Delete
  await ExampleModel.destroy({ where: { name: "updated" } });
}
main();
