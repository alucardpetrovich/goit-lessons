const { Sequelize } = require("sequelize");
const { getConfig } = require("./config");
const { UserModel, userSchema } = require("./users/user.model");

let connection;

exports.getConnection = async function () {
  if (connection) {
    return connection;
  }

  const { database } = getConfig();
  connection = new Sequelize(database.url);
  UserModel.init(userSchema, { sequelize: connection, tableName: "users" });
  await UserModel.sync();

  return connection;
};
