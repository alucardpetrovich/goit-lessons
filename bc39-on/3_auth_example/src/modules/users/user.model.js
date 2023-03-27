const { Schema, model } = require("mongoose");

const usersSchema = new Schema({
  username: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  passwordHash: { type: String, require: true },
  twoFaEnabled: { type: Boolean, require: true },
});

// model name User -> collection name users
exports.UserModel = model("User", usersSchema);
