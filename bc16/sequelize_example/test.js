const Sequelize = require("sequelize");
const { Model } = Sequelize;

const connection = new Sequelize({
  dialect: "postgres",
  host: "34.77.40.213",
  username: "sequelize_test",
  password: "qwerty",
  database: "sequelize-example",
  port: 5432
});

async function main() {
  await connection.authenticate();
  console.log("Connected to database");

  class User extends Model {}
  User.init(
    {
      name: { type: Sequelize.STRING, allowNull: false },
      surname: { type: Sequelize.STRING, allowNull: false }
    },
    {
      sequelize: connection,
      // table name: users
      modelName: "User"
    }
  );

  await connection.sync();
}

main();
