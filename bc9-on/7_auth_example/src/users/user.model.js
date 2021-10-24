const { Model, DataTypes } = require("sequelize");

exports.userSchema = {
  displayName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
};

class UserModel extends Model {
  static async findUser(params) {
    return this.findOne({ where: params });
  }

  static async createUser(params) {
    const createResult = await this.create(params, { returning: true });
    return createResult;
  }
}

exports.UserModel = UserModel;
