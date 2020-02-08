const mongoose = require("mongoose");
const { Schema } = mongoose;

main();

async function main() {
  await mongoose.connect(
    "mongodb+srv://levkiv:1234567890@testcluster-oqqlz.mongodb.net/mongodb_example?retryWrites=true"
  );
  console.log("Successfully connected to db");

  const { User } = initModels();

  // await User.create({
  //   email: "user@email.com",
  //   age: 1
  // });

  const user = await User.findOne({
    email: "1"
  });

  // user.name = 'asdfasd';
  // await user.save();
  // await User.updateOne({ email: "1" }, { $set: { age: 90 } });

  await User.deleteOne({ email: "1" });

  console.log(user);
}

function initModels() {
  const userSchema = new Schema({
    email: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String
    },
    age: {
      type: Number
    }
  });

  const User = mongoose.model("User", userSchema);

  return { User };
}
