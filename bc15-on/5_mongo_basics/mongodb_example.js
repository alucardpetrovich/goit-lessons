const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

async function main() {
  const url = process.env.MONGODB_URL;
  const dbName = process.env.MONGODB_DB_NAME;
  const client = new MongoClient(url);

  await client.connect();
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  const users = db.collection("users");

  // 1. C - Create
  // await documents.insertOne({
  //   title: "First document",
  //   body: "this is my first test document",
  // });
  // for (let i = 0; i < 100; i++) {
  //   await users.insertOne({
  //     name: `User ${i}`,
  //     age: i + 1,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   });
  // }

  // 2. R - Read
  // console.log(await documents.find({ title: "First document" }).toArray());
  // const page = 5;
  // const limit = 10;
  // const skip = (page - 1) * limit;

  // const usersList = await users
  //   .find(
  //     { $or: [{ age: { $lte: 18 } }, { age: { $gte: 50 } }] },
  //     { projection: { name: 0 } }
  //   )
  //   .sort({ age: "desc" })
  //   .limit(limit)
  //   .skip(skip)
  //   .toArray();
  // console.log(usersList);

  // 3. U - Update
  // await users.updateMany(
  //   { age: { $lte: 18 } },
  //   { $set: { name: "you're still too young" } }
  // );

  // 4. D - Delete
  // await users.deleteMany({ age: { $gte: 50 } });
}

main();
