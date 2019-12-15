import mongoose from 'mongoose';
import { createHash } from 'crypto';
import randomstring from 'randomstring';
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  password_salt: { type: String, required: true },

  verification_token: { type: String, required: false },
  verification_token_expires_at: { type: Date, required: false },

});
userSchema.statics.findUserByEmail = findUserByEmail;
userSchema.statics.createUser = createUser;
userSchema.statics.createPasswordHash = createPasswordHash;

function findUserByEmail(email) {
  return this.findOne({ email });
}

function createUser(email, password) {
  const passwordSalt = randomstring.generate(16);
  const passwordHash = this.createPasswordHash(password, passwordSalt);

  return this.create({
    email,
    password_hash: passwordHash,
    password_salt: passwordSalt
  });
}

function createPasswordHash(password, passwordSalt) {
  return createHash('sha256').update(password + passwordSalt).digest('hex');
}

export const userModel = mongoose.model('User', userSchema);
