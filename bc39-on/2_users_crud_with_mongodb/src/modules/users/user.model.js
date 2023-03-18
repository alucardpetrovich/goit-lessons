const { Schema, model } = require("mongoose");

const usersSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, require: true },
});

// model name User -> collection name users
exports.UserModel = model("User", usersSchema);
