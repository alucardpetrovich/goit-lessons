const { Schema, model } = require("mongoose");
const { v4 } = require("uuid");

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    verificationToken: { type: String, required: false, default: () => v4() },
  },
  { timestamps: true }
);

// collection name - users
exports.UserModel = model("User", userSchema);
