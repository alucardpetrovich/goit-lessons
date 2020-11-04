const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const { MongoClient, ObjectId } = require("mongodb");

// __dirname vs cwd
// console.log("cwd", process.cwd());
// console.log("__dirname", __dirname);

// Use connect method to connect to the server
// MongoClient.connect(url, function (err, client) {
//   const db = client.db(dbName);
//   client.close();
// });

async function main() {
  const client = await MongoClient.connect(process.env.MONGODB_URL);
  const db = client.db(process.env.MONGODB_NAME);

  // const postsCollection = db.collection("posts");

  // const employeesCollection = db.collection("employees");

  // 1. C - create
  // await postsCollection.insertOne({
  //   title: "First post",
  //   content: "This is my first post",
  //   createdAt: new Date(),
  // });
  // await employeesCollection.insertMany([
  //   {
  //     name: "John Doe",
  //     age: 15,
  //     professionalSkills: ["software_engineer", "qa_engineer"],
  //   },
  //   {
  //     name: "Mark Tven",
  //     age: 25,
  //     professionalSkills: ["qa_engineer"],
  //   },
  //   {
  //     name: "Anton",
  //     age: 45,
  //     professionalSkills: [],
  //   },
  // ]);

  // 2. R - Read
  // console.log(await postsCollection.find({ title: "First post" }).toArray());
  // console.log(await postsCollection.findOne({ title: "First post" }));
  // console.log(
  //   await employeesCollection
  //     .find({
  //       age: { $lte: 40 },
  //       professionalSkills: "software_engineer",
  //     })
  //     .toArray()
  // );

  // 3. U - Update
  // await employeesCollection.findOneAndUpdate(
  //   {
  //     _id: new ObjectId("5fa1a82ea2a52e50cde066ea"),
  //   },
  //   {
  //     $set: { name: "Updated" },
  //     $set: { professionalSkills: "dev_ops" },
  //     $push: { professionalSkills: "dev_ops" },
  //   }
  // );

  // 4. D - Delete
  // await employeesCollection.deleteOne({ name: "Updated" });
}
main();
