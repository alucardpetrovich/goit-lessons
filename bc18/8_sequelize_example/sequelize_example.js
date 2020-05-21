const Sequelize = require("sequelize");

const dbConnection = new Sequelize({
  // Your PostgreSQL database options
  host: "",
  database: "",
  dialect: "postgres",
  username: "",
  password: "",
});

async function main() {
  await dbConnection.authenticate();

  // table name -> Posts
  const PostModel = dbConnection.define(
    "Post",
    {
      title: { type: Sequelize.STRING, allowNull: false },
      content: { type: Sequelize.STRING, allowNull: false },
    },
    {
      paranoid: true,
    }
  );

  await dbConnection.sync({ force: true });

  await PostModel.create({
    title: "Hello",
    content: "world",
  });

  // console.log(await PostModel.findOne({ where: { title: "Hello" } }));

  // await PostModel.update({ content: "updated" }, { where: { title: "Hello" } });

  // console.log(await PostModel.findOne({ where: { title: "Hello" } }));

  await PostModel.destroy({ where: { title: "Hello" } });

  console.log(await PostModel.findAll());
  console.log(await PostModel.findAll({ paranoid: false }));
}

main();
