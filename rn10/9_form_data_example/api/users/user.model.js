import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatarUrl: { type: String, required: true },
});

export const userModel = mongoose.model("User", userSchema);
