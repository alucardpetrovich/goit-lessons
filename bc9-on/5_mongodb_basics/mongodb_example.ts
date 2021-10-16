import { MongoClient, ObjectId } from "mongodb";

const url = "";
const client = new MongoClient(url);

// Database Name
const dbName = "bc9on_basics";

async function main() {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("users");

  // 1. C - Create
  // await collection.insertOne({
  //   firstName: "mike",
  //   lastName: "portnoy",
  //   age: 45,
  // });
  // console.log("User created");

  // 2. R - Read
  // console.log(
  //   await collection.findOne({
  //     firstName: "mike",
  //   })
  // );
  // console.log(
  //   await collection
  //     .find({
  //       firstName: "mike",
  //     })
  //     .toArray()
  // );

  // 3. U - Update
  // await collection.updateOne(
  //   { firstName: "mike" },
  //   { $set: { firstName: "updated" } }
  // );

  // 4. D - Delete
  // await collection.deleteOne({
  //   firstName: "updated",
  // });

  await client.close();
}
main();
