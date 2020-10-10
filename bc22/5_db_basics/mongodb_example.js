const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const { promisify } = require("util");
const { MongoClient, ObjectID } = require("mongodb");

const connectionPromise = promisify(MongoClient.connect.bind(MongoClient));

const dbName = "bc22_goit_db_basics";
const url = process.env.MONGODB_URL;

// Use connect method to connect to the server
async function main() {
  // const connection = await MongoClient.connect(url);
  const connection = await connectionPromise(url);

  const db = connection.db(dbName);
  const exampleCollection = db.collection("example");

  // CRUD

  // 1. C - Create
  // await exampleCollection.insertOne({
  //   name: "hello",
  //   number: 5,
  //   array: [
  //     {
  //       hello: "world",
  //     },
  //   ],
  // });

  // await exampleCollection.insertMany([
  //   {
  //     name: "first",
  //     number: 6,
  //   },
  //   {
  //     name: "second",
  //     number: 7,
  //   },
  // ]);

  // 2. R - Read
  // console.log(
  //   await exampleCollection.findOne({
  //     _id: new ObjectID("5f81764da878fbe9851a18df"),
  //   })
  // );
  // console.log(
  //   await exampleCollection.find({ number: { $gte: 5, $lte: 10 } }).toArray()
  // );
  // console.log(await exampleCollection.find().toArray());

  // 3. U - Update
  // await exampleCollection.updateOne(
  //   { name: "first" },
  //   { $set: { number: 11 } }
  // );
  // await exampleCollection.updateOne(
  //   { _id: new ObjectID("5f8176874e848fe9e79cd52f") },
  //   { $push: { array: { name: "second array element" } } }
  // );

  // 4. D - Delete
  // await exampleCollection.deleteOne({ name: "hello" });
}
main();
