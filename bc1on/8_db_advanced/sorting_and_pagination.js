const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const mongoose = require("mongoose");
const { Schema } = mongoose;

const customerSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  ageStr: { type: String, required: true },
});
const CustomerModel = mongoose.model("Customer", customerSchema);

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);

  // for (let i = 0; i < 50; i++) {
  //   await CustomerModel.create({
  //     name: "user" + i,
  //     age: i + 1,
  //     ageStr: `${i + 1}`,
  //   });
  // }
  const page = 2;
  const PAGE_SIZE = 10;

  console.log(
    await CustomerModel.find().sort({ age: -1 }).skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE)
  );
}
main();
