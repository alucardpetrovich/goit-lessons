const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  verificationToken: { type: String, required: false },
});

// collection name => users
exports.User = mongoose.model("User", userSchema);
