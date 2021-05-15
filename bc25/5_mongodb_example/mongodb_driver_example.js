const { MongoClient, ObjectId } = require("mongodb");

// Connection URL
const url = "";

// Database Name
const dbName = "bc25_example";
const client = new MongoClient(url, { useUnifiedTopology: true });

async function main() {
  await client.connect();
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  const users = db.collection("users");

  // await users.insertOne({
  //   name: "test1",
  //   email: "test1@email.com",
  //   password: "qwerty",
  //   age: 15,
  //   hobbies: ["skiing", "hiking", "bicycle"],
  // });
  // await users.insertMany([
  //   {
  //     name: "test2",
  //     email: "test2@email.com",
  //     password: "qwerty",
  //     age: 25,
  //     hobbies: ["football"],
  //   },
  //   {
  //     name: "test3",
  //     email: "test3@email.com",
  //     password: "qwerty",
  //     age: 40,
  //     hobbies: ["basketball"],
  //   },
  // ]);

  // console.log(await users.find().toArray());
  // console.log(
  //   await users.findOne({ _id: new ObjectId("6096470c776560b60fd47495") })
  // );
  // console.log(await users.find({ age: 40 }).toArray());
  // console.log(await users.find({ age: { $gte: 18, $lte: 50 } }).toArray());
  // console.log(await users.find({ email: /1\@email.com/i }).toArray());
  // console.log(await users.find({ age: { $in: [10, 40] } }).toArray());

  // await users.updateMany({ name: "test3" }, { $set: { password: "updated" } });
  // await users.updateMany({}, { $inc: { age: 1 } });
  // await users.updateOne(
  //   { name: "test5" },
  //   { $set: { age: 50 }, $setOnInsert: { password: "upserted" } },
  //   { upsert: true }
  // );

  // await users.deleteOne({ name: "test5" });

  // console.log(
  //   await users.find({ hobbies: { $all: ["hiking", "skiing"] } }).toArray()
  // );

  // await users.updateOne(
  //   { name: "test1" },
  //   {
  //     $pullAll: {
  //       hobbies: ["hiking", "skiing"],
  //     },
  //   }
  // );
}
main();
