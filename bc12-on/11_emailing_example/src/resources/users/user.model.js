const mongoose = require("mongoose");
const { USER_STATUSES } = require("./user-statuses");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  verificationToken: { type: String, required: false },
  status: {
    type: String,
    required: true,
    enum: Object.values(USER_STATUSES),
    default: USER_STATUSES.VERIFICATION_NEEDED,
  },
});

// User => users
const UserModel = mongoose.model("User", userSchema);
exports.UserModel = UserModel;
