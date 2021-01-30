import dotenv from "dotenv";
import path from "path";
import mongodb from "mongodb";
import { getPaths } from "./utils.js";

const { __dirname } = getPaths(import.meta.url);
dotenv.config({ path: path.join(__dirname, ".env") });
const { MongoClient, ObjectID } = mongodb;

const client = await MongoClient.connect(process.env.MONGODB_URL);
const db = client.db("bc24_basics");

const postsCollection = db.collection("posts");

// const newPost = await postsCollection.insertOne({
//   title: "second",
//   content: "I created second post",
//   createdAt: new Date(),
// });

// const post = await postsCollection.findOne({
//   _id: new ObjectID("60152cbeea1f0a9fa0763c7b"),
// });
// console.log(post);

const posts = await postsCollection.find().sort({ createdAt: -1 }).toArray();
console.log(posts);

await postsCollection.updateOne(
  {
    _id: new ObjectID("60152f77e25f66a434ef59d3"),
  },
  {
    $set: { title: "update title" },
  }
);

await postsCollection.deleteMany();
