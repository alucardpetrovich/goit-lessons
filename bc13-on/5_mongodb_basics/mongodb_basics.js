const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

const url = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

async function main() {
  const client = new MongoClient(url);

  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);

  const docs = db.collection("documents");

  // C - Create

  // const doc = await docs.insertOne({
  //   title: "First post",
  //   body: "This is my first post",
  //   createdAt: new Date(),
  // });
  // console.log(doc);

  // R - Read

  // console.log(
  //   await docs.findOne({ _id: new ObjectId("627165d29681e012d1b3d66c") })
  // );
  // console.log(
  //   await docs.find({ _id: new ObjectId("627165d29681e012d1b3d66c") }).toArray()
  // );

  // U - Update

  // await docs.updateOne(
  //   { _id: new ObjectId("627165d29681e012d1b3d66c") },
  //   { $set: { title: "This is modified title" } }
  // );

  // console.log(
  //   await docs.findOne({ _id: new ObjectId("627165d29681e012d1b3d66c") })
  // );

  // D - Delete

  // await docs.deleteOne({ _id: new ObjectId("627165d29681e012d1b3d66c") });

  // await docs.insertOne({
  //   title: "fourth post",
  //   body: "This is my fourth post",
  //   createdAt: new Date(),
  // });

  // console.log(
  //   await docs
  //     .find(
  //       { createdAt: { $lte: new Date("2022-05-03T18:39:40.379+00:00") } },
  //       { projection: { _id: 1, title: 1 } }
  //     )
  //     .toArray()
  // );

  // console.log(
  //   await docs
  //     .find()
  //     .collation({ locale: "en" })
  //     .sort({ title: "descending" })
  //     .toArray()
  // );

  console.log(
    await docs
      .find({
        // $or: [{ title: "third post" }, { body: "This is my second post" }],
        title: "Second post",
        body: "This is my second post",
      })
      .toArray()
  );

  return "done.";
}

main();
