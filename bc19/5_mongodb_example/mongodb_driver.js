const { MongoClient, ObjectId } = require("mongodb");

// insert your MongoDB URL
const url = "";

const dbName = "bc19_example";

async function main() {
  const client = await MongoClient.connect(url);

  const db = client.db(dbName);

  const users = db.collection("users");

  // await users.insertOne({
  //   name: "test user",
  //   age: 17,
  // });

  console.log(
    await users.findOne({ _id: new ObjectId("5efb78eff12dc0220893358a") })
  );

  console.log("successfully passed");
  process.exit(0);
}

main();
