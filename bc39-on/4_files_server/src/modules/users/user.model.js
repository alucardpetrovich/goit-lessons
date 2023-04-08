const { Schema, model } = require("mongoose");

const usersSchema = new Schema({
  username: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  twoFaEnabled: { type: Boolean, required: true, default: false },
  avatarPath: { type: String, required: false },
});

// model name User -> collection name users
exports.UserModel = model("User", usersSchema);
