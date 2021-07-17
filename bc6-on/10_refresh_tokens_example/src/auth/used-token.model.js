const mongoose = require("mongoose");
const { Schema } = mongoose;

const expiredTokenSchema = new Schema({
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

exports.UsedTokenModel = mongoose.model("ExpiredToken", expiredTokenSchema);
