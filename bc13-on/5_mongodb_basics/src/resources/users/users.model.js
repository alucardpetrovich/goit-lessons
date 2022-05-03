const { Schema, model } = require("mongoose");

const usersSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

usersSchema.statics.updateUser = (id, updateParams) => {
  return this.UserModel.findByIdAndUpdate(id, updateParams, { new: true });
};

// collection name => users
exports.UserModel = model("User", usersSchema);
