const mongoose = require("mongoose");
const { Schema } = mongoose;
const randomstring = require("randomstring");

const cryptoHelper = require("../helpers/crypto.helper");

const userSchema = new Schema({
  username: { type: String, required: true, default: "Anonymus" },
  email: { type: String, required: false, unique: true },
  provider: { type: String, required: true, default: "plain" },

  password_hash: { type: String, required: false },
  password_salt: { type: String, required: false }
});

userSchema.statics.createUser = createUser;
userSchema.statics.createPasswordHash = createPasswordHash;
userSchema.statics.findUserByEmail = findUserByEmail;
userSchema.statics.checkPassword = checkPassword;

function createUser(userMeta) {
  const passwordSalt = randomstring.generate(32);

  userMeta.password_salt = passwordSalt;
  userMeta.password_hash = this.createPasswordHash(
    userMeta.password,
    passwordSalt
  );
  delete userMeta.password;

  return this.create(userMeta);
}

function findUserByEmail(email) {
  return this.findOne({ email });
}

function createPasswordHash(password, salt) {
  return cryptoHelper.createHash(password + salt);
}

function checkPassword(user, password) {
  const password_hash = this.createPasswordHash(password, user.password_salt);
  return password_hash === user.password_hash;
}

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
