const { Model, DataTypes } = require("sequelize");
const { UserStatuses } = require("./user-statuses");
const uuid = require("uuid");

exports.userSchema = {
  displayName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    enum: Object.values(UserStatuses),
    defaultValue: UserStatuses.VERIFICATION_NEEDED,
  },
  verificationToken: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: () => uuid.v4(),
  },
};

class UserModel extends Model {
  static async findUser(params) {
    return this.findOne({ where: params });
  }

  static async createUser(params) {
    const createResult = await this.create(params, { returning: true });
    return createResult;
  }

  static async updateById(id, values) {
    return this.update(values, { where: { id } });
  }
}

exports.UserModel = UserModel;
