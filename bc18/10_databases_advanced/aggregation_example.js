const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.set("debug", true);

const viewerSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  favouriteFilmIds: [{ type: mongoose.Types.ObjectId, ref: "Film" }],
});

const filmSchema = new Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
});

const viewerModel = mongoose.model("Viewer", viewerSchema);
const filmModel = mongoose.model("Film", filmSchema);

async function main() {
  mongoose.set("useCreateIndex", true);
  await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  });

  // const films = await filmModel.create(
  //   { name: "Titanic", genre: "drama" },
  //   { name: "Lord of the Rings", genre: "fantasy" },
  //   { name: "The King's Speech", genre: "drama" },
  //   { name: "Gentleman", genre: "Action" }
  // );

  // await viewerModel.create(
  //   {
  //     name: "Anton",
  //     age: 20,
  //     favouriteFilmIds: [films[0]._id, films[2]._id],
  //   },
  //   {
  //     name: "Elena",
  //     age: 35,
  //     favouriteFilmIds: [films[1]._id, films[3]._id],
  //   }
  // );

  // console.log(
  //   await userModel
  //     .find({ age: { $gt: 20 } })
  //     .sort({ age: 1 })
  //     .limit(2)
  // );

  const userWithFilms = await viewerModel.aggregate([
    {
      $lookup: {
        from: "films",
        localField: "favouriteFilmIds",
        foreignField: "_id",
        as: "favouriteFilms",
      },
    },
  ]);

  // const userWithFilms = await viewerModel.find().populate("favouriteFilmIds");

  console.log(
    "userWithFilms",
    userWithFilms.map((user) => user.favouriteFilmIds)
  );
}

main();
