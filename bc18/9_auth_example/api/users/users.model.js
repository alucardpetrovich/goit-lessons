import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    token: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.findByEmail = findByEmail;
userSchema.statics.createUser = createUser;
userSchema.statics.updateUser = updateUser;
userSchema.statics.findByToken = findByToken;

async function findByEmail(email) {
  return this.findOne({ email });
}

async function findByToken(token) {
  return this.findOne({ token });
}

async function createUser(username, email, passwordHash) {
  return this.create({ username, email, passwordHash });
}

async function updateUser(id, setFields) {
  return this.findByIdAndUpdate(
    id,
    {
      $set: setFields,
    },
    { new: true }
  );
}

// collection name -> users
export const UserModel = mongoose.model("User", userSchema);
