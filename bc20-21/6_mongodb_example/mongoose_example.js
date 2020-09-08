const mongoose = require("mongoose");
const { Schema } = mongoose;
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);

  const userSchema = new Schema({
    first_name: String,
    email: {
      type: String,
      required: true,
      alias: "login",
      validate: (value) => value.includes("@"),
      unique: true,
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 95,
    },
    last_name: {
      type: String,
      default: "Ivanov",
      get: (v) => v.toUpperCase(),
    },
  });

  // collection name => users
  const UserModel = mongoose.model("User", userSchema);

  // await UserModel.create({
  //   first_name: "hello",
  //   email: "email@email.com",
  //   age: 95,
  // });

  // await UserModel.updateOne({ first_name: "hello" }, { last_name: "Petrov" });

  await UserModel.deleteOne({ first_name: "hello" });

  console.log(await UserModel.find({ first_name: "hello" }));
}
main();
