const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  films: [
    {
      name: { type: String, required: true },
    },
  ],
});

userSchema.statics.findUserByIdAndUpdate = findUserByIdAndUpdate;

async function findUserByIdAndUpdate(userId, updateParams) {
  return this.findByIdAndUpdate(
    userId,
    {
      $set: updateParams,
    },
    {
      new: true,
    }
  );
}

// users
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
