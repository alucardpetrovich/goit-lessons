const { MongoClient, ObjectId } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "";
const client = new MongoClient(url);

// Database Name
const dbName = "bc39_on";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);

  const collection = db.collection("documents");

  // the following code examples can be pasted here...

  // C - Create
  // await collection.insertOne({
  //   title: "Example",
  //   filename: "example.json",
  //   content: '{"hello": "world"}',
  //   version: 4,
  // });

  // R - Read
  // console.log(
  //   await collection.findOne({ _id: new ObjectId("6415885cb419c9a6a06f6ed8") })
  // );
  // console.log(
  //   await collection
  //     .find({
  //       // $or: [{ title: "Example" }, { filename: "example.json" }]
  //       version: { $gt: 3 },
  //     })
  //     .toArray()
  // );

  // U - Update
  // await collection.updateOne(
  //   { _id: new ObjectId("64158b1a2a1905244b00721d") },
  //   { $inc: { version: 10 } }
  // );

  // D - Delete
  await collection.deleteOne({ _id: new ObjectId("64158b1a2a1905244b00721d") });

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
