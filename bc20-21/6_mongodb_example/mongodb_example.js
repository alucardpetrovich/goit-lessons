const path = require("path");
const { ObjectId } = require("mongodb");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const MongoClient = require("mongodb").MongoClient;

async function main() {
  const connection = await MongoClient.connect(process.env.MONGODB_URL);

  const dbName = "bc20-21-example";
  const db = connection.db(dbName);
  const collection = db.collection("users");

  // await collection.insertOne({
  //   name: "hello",
  //   surname: "world",
  //   details: {
  //     age: 111,
  //     hello: "world",
  //   },
  // });

  // await collection.updateOne(
  //   { _id: new ObjectId("5f57cb021bf2d5adefd51ae5") },
  //   { $set: { name: "updated" } }
  // );

  await collection.deleteOne({ _id: new ObjectId("5f57cb021bf2d5adefd51ae5") });

  console.log(
    await collection.findOne({ _id: new ObjectId("5f57cb021bf2d5adefd51ae5") })
  );
}
main();
