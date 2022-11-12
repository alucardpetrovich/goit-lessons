import mongoose, { Schema } from "mongoose";

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

const usersSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel = mongoose.model("User", usersSchema);
