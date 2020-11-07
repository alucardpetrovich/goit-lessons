const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  dialect: process.env.DATABASE_DIALECT,
  port: process.env.DATABASE_PORT,
  logging: false
});

async function main() {
  await sequelize.authenticate();

  // table name => Customers
  const CustomerModel = sequelize.define("Customer", {
    name: { type: Sequelize.STRING, allowNull: false },
    age: { type: Sequelize.INTEGER, allowNull: false },
    country: { type: Sequelize.STRING, allowNull: false },
  });

  await CustomerModel.sync();

  // 1. C - Create
  // await CustomerModel.create({
  //   name: "second",
  //   age: 20,
  //   country: "Ukraine",
  // });

  // 2. R - Read
  // console.log(await CustomerModel.findOne({ where: { name: "second" } }));
  // console.log(await CustomerModel.findAll({ where: { country: "UA" } }));

  // 3. U - Update
  // console.log(
  //   await CustomerModel.update({ name: "updated" }, { where: { id: 2 } })
  // );

  // 4. D - Delete
  // await CustomerModel.destroy({ where: { id: 1 } });
}
main();
