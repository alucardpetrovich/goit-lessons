const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// model name !== collection name. Collection name -> users
const UserModel = model("User", userSchema);

exports.UserModel = UserModel;
