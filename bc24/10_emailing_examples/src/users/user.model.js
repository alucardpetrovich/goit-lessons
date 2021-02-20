import mongoose from "mongoose";
import * as uuid from "uuid";
import { USER_STATUSES } from "./user-statuses.js";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  verificationToken: {
    type: String,
    required: false,
    default: () => uuid.v4(),
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(USER_STATUSES),
    default: USER_STATUSES.CREATED,
  },
});

// collection name => users
export const userModel = mongoose.model("User", userSchema);
