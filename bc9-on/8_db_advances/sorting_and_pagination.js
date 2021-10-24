const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  age: { type: Number, required: true },
  ageStr: { type: String, required: true },
});
const UserModel = mongoose.model("User", userSchema);

async function main() {
  await mongoose.connect(
    "mongodb+srv://bc9on:tXOo6ffIh70hzWBX@testcluster.oqqlz.mongodb.net/bc9on_advanced?retryWrites=true&w=majority"
  );

  // for (let i = 0; i < 50; i++) {
  //   await UserModel.create({
  //     username: `test${i + 1}`,
  //     age: i + 1,
  //     ageStr: String(i + 1),
  //   });
  // }

  const limit = 20;
  const skip = (page - 1) * limit;

  console.log(await UserModel.find().skip(40).limit(20).sort({ age: "asc" }));
}
main();
