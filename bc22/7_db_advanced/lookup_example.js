const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const mongoose = require("mongoose");
const { Schema } = mongoose;

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);

  const viewerSchema = new Schema({
    _id: { type: Number, required: true },
    name: { type: String, required: true },
    favouriteFilmIds: [{ type: Number }],
  });

  const filmSchema = new Schema({
    _id: { type: Number, required: true },
    name: { type: String, required: false },
    genre: { type: String, required: false },
  });

  const ViewerModel = mongoose.model("Viewer", viewerSchema);
  const FilmModel = mongoose.model("Film", filmSchema);

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

  // console.log(
  //   await ViewerModel.aggregate([
  //     {
  //       $lookup: {
  //         // collection name
  //         from: "films",
  //         localField: "favouriteFilmIds",
  //         foreignField: "_id",
  //         as: "favouriteFilms",
  //       },
  //     },
  //     { $project: { favouriteFilms: 1, _id: 0 } },
  //   ])
  // );
  console.log(await ViewerModel.find({}, { _id: 0, name: 1 }));
}
main();
