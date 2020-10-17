const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const mongoose = require("mongoose");
const { Schema } = mongoose;

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);

  const customerSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    ageStr: { type: String, required: true },
  });

  const CustomerModel = mongoose.model("Customer", customerSchema);

  // for (let i = 0; i < 100; i++) {
  //   await CustomerModel.create({
  //     name: "name" + i,
  //     age: i + 1,
  //     ageStr: `${i + 1}`,
  //   });
  // }
  // console.log("Executed successfully");

  // console.log(await CustomerModel.find().sort({ age: 1 }));
  // console.log(await CustomerModel.find().sort({ ageStr: 1 }));
  // console.log(await CustomerModel.find().sort({ age: 1 }).limit(5));
}
main();
