const mongoose = require("mongoose");
const { Schema } = mongoose;

const MONGODB_URL = ""; // Your MongoDB URI

async function main() {
  mongoose.set("useCreateIndex", true);
  await mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    balance: { type: Number, required: true },
    password: { type: String, required: true },
  });

  // collection name -> users
  const UserModel = mongoose.model("User", userSchema);

  await UserModel.create({
    username: "test",
    email: "test@email.com",
    password: "qwerty",
    balance: 0,
  });

  // console.log(await UserModel.findById("5ebfb65b79833a4290df0efb"));
  // console.log(await UserModel.findOne({ email: "test@email.com" }));
  // console.log(await UserModel.find({ email: "test@email.com" }));
  // await UserModel.updateOne(
  //   { email: "test@email.com" },
  //   { $set: { username: "updated username" } }
  // );
  // await UserModel.deleteOne({ email: "test@email.com" });
  // await UserModel.updateOne(
  //   { email: "test@email.com" },
  //   {
  //     $inc: { balance: 4 },
  //   }
  // );
  // await UserModel.updateOne(
  //   { email: "test@email.com" },
  //   {
  //     $inc: { balance: -2 },
  //   }
  // );
  // await UserModel.updateOne(
  //   { email: "test@email.com" },
  //   {
  //     $inc: { balance: 5 },
  //   }
  // );
}

main();
