const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: false },
    provider: {
      type: String,
      required: true,
      enum: ["plain", "google"],
      default: "plain"
    }
  },
  {
    timestamps: true
  }
);

userSchema.statics.findByEmail = findByEmail;
userSchema.statics.createUser = createUser;
userSchema.methods.validPassword = validPassword;

async function findByEmail(email) {
  return this.findOne({ email });
}

async function createUser(userBody) {
  return this.create(userBody);
}

async function validPassword(password) {
  return bcrypt.compare(password, this.passwordHash);
}

module.exports = {
  UserModel: mongoose.model("User", userSchema)
};
