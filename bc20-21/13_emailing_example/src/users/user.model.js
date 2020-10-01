const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  verificationToken: { type: String, required: false },
  isVerified: { type: Boolean, default: false },
});

const UserModel = mongoose.model("User", userSchema);

exports.UserModel = UserModel;
