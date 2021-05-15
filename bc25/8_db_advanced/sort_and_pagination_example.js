const dotenv = require("dotenv");
const { connect, Schema, model } = require("mongoose");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

async function main() {
  const { DATABASE_URL } = process.env;
  await connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  const userSchema = new Schema({
    username: { type: String, required: true },
    age: { type: Number, required: true },
    ageStr: { type: String, required: true },
  });

  const UserModel = model("User", userSchema);

  // for (let i = 0; i < 50; i++) {
  //   await UserModel.create({
  //     username: `test${i + 1}`,
  //     age: (i + 1) * 5,
  //     ageStr: String((i + 1) * 5),
  //   });
  // }

  console.log(await UserModel.find().sort({ age: "desc" }).skip(20).limit(10));
}
main();
