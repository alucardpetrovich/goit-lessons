// test_admin
// 3NDTlo02mIHFjVSB

// mongodb+srv://test_admin:3NDTlo02mIHFjVSB@bc17-mongodb-example-bekn8.mongodb.net/test?retryWrites=true&w=majority
const mongodb = require("mongodb");
const { MongoClient, ObjectID } = mongodb;
const MONGODB_URL =
  "mongodb+srv://test_admin:3NDTlo02mIHFjVSB@bc17-mongodb-example-bekn8.mongodb.net/test?retryWrites=true&w=majority";
const DB_NAME = "test_db";

async function main() {
  const client = await MongoClient.connect(MONGODB_URL);
  console.log("Successfully connected to DB");

  const db = client.db(DB_NAME);
  const example_collection = db.collection("example_collection");
  const usersCollection = db.collection("users");

  const user = await usersCollection.findOne({
    _id: new ObjectID("5e88477a65d35d1875319d97"),
  });

  console.log(user);

  // await example_collection.insertMany([
  //   {
  //     name: "hello",
  //     surname: "world",
  //   },
  //   {
  //     age: 200,
  //     test: "collection",
  //   },
  // ]);
  // console.log(
  //   await example_collection
  //     .find({ $or: [{ username: "Test user 1" }, { name: "hello" }] })
  //     .toArray()
  // );
}

main();
