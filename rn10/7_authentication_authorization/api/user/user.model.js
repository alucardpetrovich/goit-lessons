import mongoose, { Schema } from "mongoose";
const { ObjectId } = mongoose.Types;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  token: { type: String, required: false },
});

userSchema.statics.createUser = createUser;
userSchema.statics.findAllUsers = findAllUsers;
userSchema.statics.findUserById = findUserById;
userSchema.statics.findUserByEmail = findUserByEmail;
userSchema.statics.updateUserById = updateUserById;
userSchema.statics.deleteUserById = deleteUserById;
userSchema.statics.findUserByToken = findUserByToken;

async function createUser(userParams) {
  return this.create(userParams);
}

async function findAllUsers() {
  return this.find();
}

async function findUserById(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return this.findById(id);
}

async function findUserByEmail(email) {
  return this.findOne({ email });
}

async function findUserByToken(token) {
  return this.findOne({ token });
}

async function updateUserById(id, userParams) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return this.findByIdAndUpdate(id, { $set: userParams }, { new: true });
}

async function deleteUserById(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return this.findByIdAndDelete(id);
}

// collection name -> users
export const userModel = mongoose.model("User", userSchema);
