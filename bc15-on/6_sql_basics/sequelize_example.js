const db = require("./models");

async function main() {
  await db.sequelize.authenticate();

  // await db.User.create({
  //   firstName: "first",
  //   lastName: "last",
  //   email: "test@email.com",
  // });

  // console.log(await db.User.findAll({where: {firstName: "first"}}));
  // console.log(await db.User.findOne({ where: { firstName: "first" } }));

  // await db.User.update({ firstName: "updated" }, { where: { id: 2 } });

  // await db.User.destroy({ where: { id: 2 } });
}
main();
