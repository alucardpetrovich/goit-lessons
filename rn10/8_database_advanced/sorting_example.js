const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
});

userSchema.plugin(mongoosePaginate);

// collection => users
const userModel = mongoose.model("User", userSchema);

async function main() {
  await mongoose.connect(
    "mongodb+srv://test:GfeKCRmv6TuUUGkE@cluster0-xdiea.gcp.mongodb.net/database_advanced?retryWrites=true&w=majority"
  );

  for (let i = 1; i < 11; i++) {
    // await userModel.create({
    //   username: `user${i}`,
    //   email: `email${i}@email.com`,
    //   age: i * 5,
    // });
  }

  // console.log(await userModel.find().sort({ age: 1 }).limit(4));
  console.log(
    await userModel.paginate(
      {
        age: { $gte: 20, $lte: 30 },
      },
      {
        sort: { age: 1 },
      }
    )
  );
}

main();
