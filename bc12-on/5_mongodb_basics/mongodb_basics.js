const dotenv = require("dotenv");
const path = require("path");
const { MongoClient, ObjectId } = require("mongodb");

dotenv.config({ path: path.resolve(__dirname, ".env") });

const url = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

const client = new MongoClient(url);

async function main() {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("users");
  // const collection = db.collection("leagues");

  // await collection.insertOne({
  //   name: "first document",
  //   createdAt: new Date(),
  // });

  // for (let i = 0; i < 50; i++) {
  //   const userNum = i + 1;
  //   await collection.insertOne({
  //     name: `user${userNum}`,
  //     age: userNum,
  //     ageStr: `${userNum}`,
  //   });
  // }
  // console.log("finished");

  // console.log(
  //   await collection.findOne({
  //     _id: new ObjectId("62077d8b4a1c0b4a3597a75c"),
  //   })
  // );

  // await collection.insertOne({
  //   name: "NFL",
  //   team: [
  //     {
  //       order: 1,
  //       name: "hello1",
  //     },
  //     {
  //       order: 2,
  //       name: "hello2",
  //     },
  //   ],
  // });
  // console.log(
  //   await collection
  //     .find({ team: { $elemMatch: { order: { $gt: 2 } } } })
  //     .toArray()
  // );

  // console.log(
  //   await collection
  //     .find({
  //       // _id: {
  //       //   $in: [
  //       //     new ObjectId("62077f943dbaf2bcfeee7551"),
  //       //     new ObjectId("62077ef5222b5f962da4af8e"),
  //       //   ],
  //       // },
  //       // name: "user18",
  //       $or: [
  //         { _id: new ObjectId("62077f943dbaf2bcfeee7551") },
  //         { name: "user25" },
  //       ],
  //     })
  //     .toArray()
  // );

  // console.log(await collection.find().sort({ age: "asc" }).toArray());

  // console.log(
  //   await collection.find().skip(2).limit(2).sort({ age: "desc" }).toArray()
  // );
  // await collection.createIndex("name");
  
}
main();
