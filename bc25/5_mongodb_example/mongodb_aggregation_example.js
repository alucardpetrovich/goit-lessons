const { MongoClient, ObjectId } = require("mongodb");

// Connection URL
const url = "";

// Database Name
const dbName = "bc25_aggregate_example";
const client = new MongoClient(url, { useUnifiedTopology: true });

async function main() {
  await client.connect();
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  const users = db.collection("users");
  const films = db.collection("films");

  // await users.insertMany([
  //   { _id: 1, name: "Ivan", favouriteFilmIds: [1, 3, 5] },
  //   { _id: 2, name: "Igor", favouriteFilmIds: [1, 2, 3] },
  //   { _id: 3, name: "Vasil" },
  // ]);
  // await films.insertMany([
  //   { _id: 1, name: "Titanic", genre: "drama" },
  //   { _id: 2, name: "Lord of the Rings", genre: "fantasy" },
  //   { _id: 3, name: "The King's Speech", genre: "drama" },
  //   { _id: 4, name: "Gentleman", genre: "Action" },
  //   { _id: 5, name: null },
  // ]);

  console.log(
    await users
      .aggregate([
        { $match: { favouriteFilmIds: 2 } },
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
          },
        },
        // {
        //   $lookup: {
        //     from: "films",
        //     foreignField: "_id",
        //     localField: "favouriteFilmIds",
        //     as: "favouriteFilms",
        //   },
        // },
      ])
      .toArray()
  );
}
main();
