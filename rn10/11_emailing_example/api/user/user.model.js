import mongoose, { Schema } from "mongoose";
const { ObjectId } = mongoose.Types;
const uuid = require("uuid");

export const USER_STATUSES = {
  NOT_VERIFIED: "NOT_VERIFIED",
  ACTIVE: "ACTIVE",
};

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  verificationToken: { type: String, required: false },
  status: {
    type: String,
    required: true,
    default: USER_STATUSES.NOT_VERIFIED,
    enum: Object.values(USER_STATUSES),
  },
  token: { type: String, required: false },
});

userSchema.statics.createUser = createUser;
userSchema.statics.findAllUsers = findAllUsers;
userSchema.statics.findUserById = findUserById;
userSchema.statics.findUserByEmail = findUserByEmail;
userSchema.statics.updateUserById = updateUserById;
userSchema.statics.deleteUserById = deleteUserById;
userSchema.statics.findUserByToken = findUserByToken;
userSchema.statics.findByVerificationToken = findByVerificationToken;
userSchema.statics.verifyUser = verifyUser;

async function createUser(userParams) {
  userParams.verificationToken = uuid.v4();
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

async function findByVerificationToken(verificationToken) {
  return this.findOne({ verificationToken });
}

async function verifyUser(verificationToken) {
  return this.updateOne(
    { verificationToken },
    { $set: { verificationToken: null, status: USER_STATUSES.ACTIVE } }
  );
}

// collection name -> users
export const userModel = mongoose.model("User", userSchema);
