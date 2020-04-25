const mongoose = require("mongoose");
const { Schema } = mongoose;

const filmSchema = new Schema({
  name: { type: String, required: false },
  genre: { type: String, required: false },
});

// films
const filmModel = mongoose.model("Film", filmSchema);

module.exports = filmModel;
