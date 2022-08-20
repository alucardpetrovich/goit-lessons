import { MongoClient, ObjectId } from "mongodb";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.join(__dirname, ".env") });

interface Document {
  title: string;
  desc: string;
  createdAt: Date;
  updatedAt: Date;
}

// Connection URL
const url = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_NAME;
if (!url || !dbName) {
  throw new Error("please set db url and name through env variables");
}
const client = new MongoClient(url);

async function main() {
  try {
    // Use connect method to connect to the server
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);

    const collection = db.collection<Document>("documents");

    // C - Create
    // await collection.insertOne({
    //   title: "Front-end course",
    //   desc: "This is GoIT Bootcamp front-end course",
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // });

    // R - Read
    // console.log(
    //   await collection
    //     .find({
    //       $or: [
    //         { title: "Front-end course" },
    //         // { createdAt: { $lt: new Date("2022-08-20T08:29:30.682Z") } },
    //         // { title: { $lt: "Front-end course" } },
    //       ],
    //     })
    //     .toArray()
    // );
    // console.log(await collection.findOne({ title: "Front-end coursesdfs" }));

    // U - Update
    // const updateRes = await collectihttp-errors on.findOneAndUpdate(
    //   { createdAt: new Date("2022-08-20T08:30:00.513Z") },
    //   { $set: { title: "updated", updatedAt: new Date() } }
    // );
    // console.log(updateRes);

    // D - Delete
    await collection.deleteOne({
      _id: new ObjectId("63009b6a3a2af8eb77613367"),
    });

    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
main();
