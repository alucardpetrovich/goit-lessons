import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: false },
    status: {
      type: String,
      required: true,
      enum: ["created", "verified"],
      default: "created"
    }
  },
  {
    timestamps: true
  }
);

userSchema.statics.findUserByEmail = findUserByEmail;
userSchema.statics.createUser = createUser;
userSchema.statics.findOrCreateUserByEmail = findOrCreateUserByEmail;
userSchema.methods.isValidPassword = isValidPassword;

async function findUserByEmail(email) {
  return this.findOne({ email });
}

async function findOrCreateUserByEmail(email, username) {
  return this.findOneAndUpdate(
    { email },
    { $setOnInsert: { username } },
    { upsert: true, new: true }
  );
}

async function createUser(username, email, passwordHash) {
  return this.create({ username, email, passwordHash });
}

async function isValidPassword(password) {
  return bcrypt.compare(password, this.passwordHash);
}

export const userModel = mongoose.model("User", userSchema);
