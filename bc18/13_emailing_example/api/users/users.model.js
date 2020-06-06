import mongoose, { Schema } from "mongoose";
import * as uuid from "uuid";

export const USER_STATUSES = {
  CREATED: "created",
  VERIFIED: "verified",
};

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    token: { type: String, required: false },
    status: {
      type: String,
      required: true,
      default: USER_STATUSES.CREATED,
      enum: Object.values(USER_STATUSES),
    },
    verificationToken: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.findByEmail = findByEmail;
userSchema.statics.createUser = createUser;
userSchema.statics.updateUser = updateUser;
userSchema.statics.findByToken = findByToken;
userSchema.statics.findByVerificationToken = findByVerificationToken;
userSchema.statics.verifyUser = verifyUser;

async function findByEmail(email) {
  return this.findOne({ email });
}

async function findByToken(token) {
  return this.findOne({ token });
}

async function findByVerificationToken(verificationToken) {
  return this.findOne({ verificationToken });
}

async function createUser(username, email, passwordHash) {
  const verificationToken = uuid.v4();

  return this.create({ username, email, passwordHash, verificationToken });
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

async function verifyUser(id) {
  return this.findByIdAndUpdate(
    id,
    {
      $set: {
        verificationToken: null,
        status: USER_STATUSES.VERIFIED,
      },
    },
    { new: true }
  );
}

// collection name -> users
export const UserModel = mongoose.model("User", userSchema);
