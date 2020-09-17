const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const mongoose = require("mongoose");
const { Schema } = mongoose;

const viewersSchema = new Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  favouriteFilmIds: [
    {
      type: Number,
    },
  ],
});
const ViewerModel = mongoose.model("Viewer", viewersSchema);

const filmSchema = new Schema({
  _id: { type: Number, required: true },
  name: { type: String },
  genre: { type: String },
});
const FilmModel = mongoose.model("Film", filmSchema);

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);

  // await ViewerModel.create(
  //   { _id: 1, name: "Ivan", favouriteFilmIds: [1, 3, 5] },
  //   { _id: 2, name: "Igor", favouriteFilmIds: [1, 2, 3] },
  //   { _id: 3, name: "Vasil" }
  // );

  // await FilmModel.create(
  //   { _id: 1, name: "Titanic", genre: "drama" },
  //   { _id: 2, name: "Lord of the Rings", genre: "fantasy" },
  //   { _id: 3, name: "The King's Speech", genre: "drama" },
  //   { _id: 4, name: "Gentleman", genre: "Action" },
  //   { _id: 5, name: null }
  // );

  const viewersWithFilms = await ViewerModel.aggregate([
    { $match: { _id: 1 } },
    {
      $lookup: {
        from: "films", // назва колекції, а не моделі!!!!

        // поле в колекції користувачів, яке містить id улюблених фільмів
        localField: "favouriteFilmIds",

        // поле в колекції фільмів, яке повинно відповідати id фільмів у
        // колекції користувачів
        foreignField: "_id",

        // як поле з документами фільмів буде називатись
        as: "favouriteFilms",
      },
    },
  ]);

  console.log(viewersWithFilms);
}
main();
