const { Sequelize, STRING, Op } = require("sequelize");

async function main() {
  // const connection = new Sequelize({
  //   database: "test2",
  //   username: "kidslike",
  //   password: "qwerty",
  //   host: "localhost",
  //   port: 5429,
  //   dialect: "postgres",
  // });
  const connection = new Sequelize(
    "postgres://kidslike:qwerty@localhost:5429/test2",
    { logging: true }
  );

  await connection.authenticate();

  // table name => Customers
  const CustomerModel = connection.define("Customer", {
    name: { type: STRING, allowNull: false },
    email: { type: STRING, allowNull: false, unique: true },
  });
  await CustomerModel.sync();

  // 1. C - Create
  // await CustomerModel.create({
  //   email: "hello@email.com",
  //   name: "hello",
  // });

  // 2. R - Read
  // console.log(
  //   await CustomerModel.findAll({ where: { email: "hello@email.com" } })
  // );

  // 3. U - Update
  // console.log(
  //   await CustomerModel.update(
  //     { name: "updated" },
  //     { where: { id: 1 }, returning: true }
  //   )
  // );

  // 4. D - Delete
  // await CustomerModel.destroy({ where: { id: 1 } });

  // for (let i = 0; i < 100; i++) {
  //   await CustomerModel.create({
  //     name: `user${i}`,
  //     email: `hello${i}@email.com`,
  //   });
  // }

  console.log(
    await CustomerModel.findAll({
      where: { id: { [Op.gte]: 20, [Op.lte]: 30 } },
      order: [["id", "ASC"]],
      offset: 5,
      limit: 5,
    })
  );
}
main();
