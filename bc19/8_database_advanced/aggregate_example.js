const mongoose = require("mongoose");
const { User } = require("../7_auth_example/src/users/user.model");
const { Schema } = mongoose;

async function main() {
  const DB_URL =
    "mongodb://admin:j4ROV0uONrG86W1I@cluster0-shard-00-00.6hzc7.mongodb.net:27017,cluster0-shard-00-01.6hzc7.mongodb.net:27017,cluster0-shard-00-02.6hzc7.mongodb.net:27017/bc19_db_advanced_example?ssl=true&replicaSet=atlas-jbcfhx-shard-0&authSource=admin&retryWrites=true&w=majority";
  await mongoose.connect(DB_URL);

  const watcherSchema = new Schema({
    name: { type: String, required: true },
    favouriteFilmsIds: [
      {
        type: mongoose.Types.ObjectId,
      },
    ],
  });
  const Watcher = mongoose.model("Watcher", watcherSchema);

  const filmsSchema = new Schema({
    name: { type: String, required: true },
    genre: { type: String },
  });
  const Film = mongoose.model("Film", filmsSchema);

  // const films = await Film.create([
  //   { name: "Titanic", genre: "drama" },
  //   { name: "Lord of the Rings", genre: "fantasy" },
  //   { name: "The King's Speech", genre: "drama" },
  //   { name: "Gentleman", genre: "Action" },
  // ]);

  // const watchers = await Watcher.create([
  //   { name: "Ivan", favouriteFilmsIds: [films[0]._id, films[2]._id] },
  //   { name: "Igor", favouriteFilmsIds: [films[1]._id, films[3]._id] },
  //   { name: "Vasil" },
  // ]);

  console.log(
    await Watcher.aggregate([
      {
        $lookup: {
          from: "films", // название колекции, а не модели!!!!

          // поле в колекции пользователей, которое содержит id любимых фильмов
          localField: "favouriteFilmsIds",

          // поле в колекции фильмов, которое должно отвечать id фильмов в
          // коллекции пользователей
          foreignField: "_id",

          // как поле с документами фильмов будет называтся
          as: "favouriteFilms",
        },
      },
      {
        $project: {
          favouriteFilms: '$favouriteFilms'
        }
      }
    ])
  );
}
main();
