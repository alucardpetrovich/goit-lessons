const uuid = require("uuid");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

userSchema.statics.updateById = async (id, params) => {
  return this.UserModel.findByIdAndUpdate(id, params, { new: true });
};

// Model name `User` => `users` collection name
exports.UserModel = mongoose.model("User", userSchema);
