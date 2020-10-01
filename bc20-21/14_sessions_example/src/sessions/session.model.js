const mongoose = require("mongoose");
const { Schema } = mongoose;

const sessionSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, required: true },
});

exports.SessionModel = mongoose.model("Session", sessionSchema);
