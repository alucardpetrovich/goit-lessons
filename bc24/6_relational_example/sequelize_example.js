import Sequelize from "sequelize";
import dotenv from "dotenv";
import path from "path";
import { getPaths } from "./utils.js";

const { DataTypes } = Sequelize;

const { __dirname } = getPaths(import.meta.url);
dotenv.config({ path: path.join(__dirname, ".env") });

const client = new Sequelize(process.env.DATABASE_URL);

await client.authenticate();

// table name - Posts
const PostModel = client.define("Post", {
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.STRING, allowNull: false },
});

await PostModel.sync();

// await PostModel.create({
//   title: "new post",
//   content: "I wrote new post",
// });

// console.log(await PostModel.findByPk(1));
// console.log(await PostModel.findAll({ order: [["title", "DESC"]] }));
// console.log(await PostModel.findOne({ where: { title: "new post" } }));

// await PostModel.update({ title: "updated" }, { where: { id: 1 } });

await PostModel.destroy({ where: { id: 1 }, limit: 1 });
