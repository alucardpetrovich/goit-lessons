const mongoose = require("mongoose");
const { Schema } = mongoose;

async function main() {
  const uri =
    "mongodb+srv://bc6_on:dUYN6bkuUEvxm1Jo@cluster0.q5f5j.mongodb.net/bc6-on_basics?retryWrites=true&w=majority";
  await mongoose.connect(uri);

  const customersSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: false, min: 18, max: 90 },
    status: {
      type: String,
      required: true,
      enum: ["created", "active", "banned"],
    },
  });

  // collection name => customers
  const CustomerModel = mongoose.model("Customer", customersSchema);

  // await CustomerModel.create({
  //   name: "hello",
  //   email: 'hello@email.com',
  //   age: 20,
  //   status: "created",
  // });

  // console.log(await CustomerModel.findById("60e0306f380c2f4bfc08429b"));

  // console.log(
  //   await CustomerModel.findByIdAndUpdate(
  //     "60e0306f380c2f4bfc08429b",
  //     { status: "active" },
  //     { new: true }
  //   )
  // );

}
main();
