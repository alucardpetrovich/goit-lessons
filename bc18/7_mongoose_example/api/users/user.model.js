import mongoose, { Schema } from "mongoose";

// id - string
// username - string
// email - string
// password - string

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.statics.createUser = createUser;
userSchema.statics.getAllUsers = getAllUsers;
userSchema.statics.getUserById = getUserById;
userSchema.statics.updateUser = updateUser;
userSchema.statics.deleteUser = deleteUser;

// collection name -> users
export const UserModel = mongoose.model("User", userSchema);

async function createUser(userParams) {
  return this.create(userParams);
}

async function getAllUsers() {
  return this.find();
}

async function getUserById(userId) {
  return this.findById(userId);
}

async function updateUser(userId, userParams) {
  return this.findByIdAndUpdate(
    userId,
    {
      $set: userParams,
    },
    { new: true }
  );
}

async function deleteUser(userId) {
  return this.findByIdAndDelete(userId);
}
