const MongoDB = require("mongodb");
const { MongoClient, ObjectId } = MongoDB;

const MONGO_DB_URL = ""; // TODO: add your url for MongoDB Atlas
const DB_NAME = "mongo_db_rn10_example";

async function main() {
  const client = await MongoClient.connect(MONGO_DB_URL);
  const db = client.db(DB_NAME);

  const users = await db.createCollection("users");

  // C (Created)

  // await users.insertOne({
  //   name: "Hello",
  //   surname: "Test",
  // });

  // await users.insertOne({
  //   name: "second",
  //   surname: "Test",
  // });

  // R (read)

  // console.log(await users.find({ name: "second" }).toArray());

  // U (Update)
  // await users.updateOne(
  //   { name: "second" },
  //   { $set: { surname: "updated Many" } }
  // );
  // await users.updateMany(
  //   { name: "second" },
  //   { $set: { surname: "updated Many" } }
  // );

  // D (Delete)
  // await users.deleteOne({ name: "second" });
  // await users.deleteMany({ name: "second" });

  // console.log(
  //   await users.findOne({ _id: new ObjectId("5eab0de8ef2cf50931ba2514") })
  // );
  // console.log(ObjectId.isValid("5eab0de8ef2cf50931ba25"));
}

main();
