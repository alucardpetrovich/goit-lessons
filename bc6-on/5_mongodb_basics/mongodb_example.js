const { MongoClient, ObjectId } = require("mongodb");

const uri =
  "mongodb+srv://bc6_on:dUYN6bkuUEvxm1Jo@cluster0.q5f5j.mongodb.net/bc6-on_basics?retryWrites=true&w=majority";
const dbName = "bc6-on_basics";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function main() {
  await client.connect();

  const db = client.db(dbName);
  const users = db.collection("users");

  // 1. C - Create
  // await users.insertOne({
  //   name: "hello",
  //   email: "hello@email.com",
  //   age: 12,
  //   ageStr: "12",
  // });
  // for (let i = 0; i < 100; i++) {
  //   await users.insertOne({
  //     name: `user${i}`,
  //     email: `hello${i}@email.com`,
  //     age: i,
  //     ageStr: String(i),
  //   });
  // }
  // await users.insertOne({
  //   name: "hello",
  // });

  // console.log("finished inserts");

  // 2. R - Read
  // console.log(await users.findOne({ email: "hello1@email.com" }));
  // console.log(await users.find({ email: "hello1@email.com" }).toArray());
  // console.log(await users.find({ age: { $gte: 18, $lte: 30 } }).toArray());
  // console.log(await users.find({ age: { $exists: false } }).toArray());
  // console.log(await users.find({ name: /user/ }).toArray());
  // console.log(await users.find({ name: /user/, age: { $lte: 3 } }).toArray());
  // console.log(
  //   await users
  //     .find({ $and: [{ name: /user/ }, { age: { $lte: 3 } }] })
  //     .toArray()
  // );
  // console.log(
  //   await users
  //     .find({ $and: [{ name: /user/ }, { age: { $lte: 3 } }] })
  //     .toArray()
  // );

  // 3. U - Update
  // await users.updateMany({ name: /user1/ }, { $inc: { age: 10 } });

  // 4. D - Delete
  // await users.deleteMany({ name: /user1/ });

  const pageNum = 3;
  const limit = 10;
  const skip = (pageNum - 1) * limit;

  console.log(
    await users.find().sort({ age: -1 }).skip(skip).limit(limit).toArray()
  );
}
main();
