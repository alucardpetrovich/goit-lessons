const { MongoClient, ObjectId } = require("mongodb");

const MONGODB_URL = ""; // Your MongoDB URI
const DB_NAME = "bc18_mongodb_example";

// console.log(MongoClient.connect(MONGODB_URL));

async function main() {
  const client = await MongoClient.connect(MONGODB_URL);
  console.log("Successfully connected to MongoDB");

  const db = client.db(DB_NAME);

  const exampleCollection = db.collection("example");

  // await exampleCollection.insert({
  //   test: "hello",
  //   numField: 12,
  // });

  const exampleId = "5ebfa4132a03183672f26c03";

  if (!ObjectId.isValid(exampleId)) {
    return;
  }

  // console.log(
  //   await exampleCollection.findOne({
  //     // _id: new ObjectId(exampleId),
  //     // test: "hello",
  //     // numField: 12,
  //     $or: [{ test: "hello" }, { numField: 15 }],
  //   })
  // );

  // await exampleCollection.createIndex("test", { unique: true });

  // await exampleCollection.insert({
  //   test: "hello",
  //   numField: 15,
  // });
}

main();
