const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// collection name -> users
exports.User = mongoose.model("User", usersSchema);
