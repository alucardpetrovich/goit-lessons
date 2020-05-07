import mongoose, { Schema } from "mongoose";
const { ObjectId } = mongoose.Types;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.statics.createUser = createUser;
userSchema.statics.findAllUsers = findAllUsers;
userSchema.statics.findUserById = findUserById;
userSchema.statics.updateUserById = updateUserById;
userSchema.statics.deleteUserById = deleteUserById;

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
