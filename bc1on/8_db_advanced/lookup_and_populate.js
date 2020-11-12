const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  favouriteFilmIds: [{ type: Number, ref: "Film" }],
});

const filmSchema = new Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: false },
  genre: { type: String, required: false },
});

const UserModel = mongoose.model("User", userSchema);
const FilmModel = mongoose.model("Film", filmSchema);

userSchema.virtual("favouriteFilms", {
  // model name
  ref: "Film",
  localField: "favouriteFilmIds",
  foreignField: "_id",
});

async function main() {
  mongoose.set("debug", 1);
  await mongoose.connect(process.env.MONGODB_URL);

  // await UserModel.create(
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

  console.log(
    JSON.stringify(
      await UserModel.aggregate([
        {
          $lookup: {
            // collection name
            from: "films",
            localField: "favouriteFilmIds",
            foreignField: "_id",
            as: "favouriteFilms",
          },
        },
      ]),
      null,
      2
    )
  );

  // console.log(
  //   JSON.stringify(await UserModel.find().populate("favouriteFilms"), null, 2)
  // );
}
main();
