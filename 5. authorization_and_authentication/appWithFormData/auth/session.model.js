const mongoose = require('mongoose');
const { Schema } = mongoose;
const sessionConstants = require('../constants/session.constant');
const { session_managment } = require('../config');
const jwt = require('jsonwebtoken');

const sessionSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, required: true },

  session_token: { type: String, required: true },
  expires_at: { type: Date, required: true },

  status: { type: Number, required: true, default: sessionConstants.status.ACTIVE },

});

sessionSchema.statics.createSession = createSession;

function createSession(userId) {
  return this.create({
    user_id: userId,
    expires_at: new Date( Date.now() + session_managment.expiery_time ),
    session_token: createToken(userId),
  });
}

function createToken(userId) {
  return jwt.sign({ userId }, session_managment.jwt.cert, { algorithm: 'HS256' });
}

const SessionModel = mongoose.model('Session', sessionSchema);

module.exports = SessionModel;
