import mongoose from 'mongoose';
import randomstring from 'randomstring';
import { createHash } from 'crypto';
const { Schema } = mongoose;

const sessionSchema = new Schema({
  user_id: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  token: { type: String, required: true },
  expires_at: { type: Date, required: true },
  status: { type: Number, required: true, default: 1 },
});
sessionSchema.statics.createSession = createSession;

function createSession(user) {
  const userId = user._id;
  const token = createHash('sha256').update(userId + randomstring.generate(16)).digest('hex');

  return this.create({
    user_id: userId,
    token,
    expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });
}

export const sessionModel = mongoose.model('Session', sessionSchema);
