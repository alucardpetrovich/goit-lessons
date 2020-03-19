import mongoose from "mongoose";
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

async function findUserByEmail(email) {
  return this.findOne({ email });
}

async function createUser(username, email, passwordHash) {
  return this.create({ username, email, passwordHash });
}

export const userModel = mongoose.model("User", userSchema);
