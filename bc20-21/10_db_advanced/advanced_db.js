const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  age: { type: Number, required: true },
  textAge: { type: String, required: true },
});
const UserModel = mongoose.model("User", userSchema);

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);

  // for (let i = 0; i < 50; i++) {
  //   await UserModel.create({
  //     username: "user" + i,
  //     age: i + 1,
  //     textAge: `${i + 1}`,
  //   });
  // }
  console.log(await UserModel.find().sort({ age: 1 }).skip(10).limit(5));
}
main();
