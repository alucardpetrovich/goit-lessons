const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

const userModel = mongoose.model("User", userSchema);

async function main() {
  mongoose.set("useCreateIndex", true);
  await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  });

  // await userModel.create(
  //   {
  //     name: "Anton",
  //     age: 18,
  //   },
  //   {
  //     name: "Sergey",
  //     age: 20,
  //   },
  //   {
  //     name: "Iryna",
  //     age: 25,
  //   },
  //   {
  //     name: "Oleg",
  //     age: 30,
  //   },
  //   {
  //     name: "Svitlana",
  //     age: 45,
  //   }
  // );

  console.log(
    await userModel
      .find({ age: { $gt: 20 } })
      .sort({ age: 1 })
      .limit(2)
  );
}

main();
