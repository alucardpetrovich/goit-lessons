import { MongoClient, ObjectId } from "mongodb";
import { config } from "dotenv";
import { join } from "path";

config({ path: join(__dirname, ".env") });

const url = process.env.MONGO_DB_URI || "";
const client = new MongoClient(url);

// Database Name
const dbName = process.env.MONGO_DB_NAME || "";

async function main() {
  // Use connect method to connect to the server
  await client.connect();

  console.log("Connected successfully to server");

  const db = client.db(dbName);
  const collection = db.collection("posts");

  // await collection.insertOne({
  //   title: "Second document",
  //   content: "This is my second MongoDB document",
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // });

  // await collection
  //   .find()
  //   .batchSize(2)
  //   .forEach((document) => console.log(document));

  // await collection.updateOne(
  //   { _id: new ObjectId("636f686c223f2b0165de23bf") },
  //   { $set: { content: "This content was updated" } }
  // );

  await collection.deleteOne({
    createdAt: { $gte: new Date("2022-11-12T09:33:32.154+00:00") },
  });

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
