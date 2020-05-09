const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

mongoose.set("debug", true);

const viewerSchema = new Schema({
  name: { type: String, required: true },
  favouriteFilmIds: [{ type: Types.ObjectId, ref: "Film" }],
});

const filmSchema = new Schema({
  name: { type: String },
  genre: { type: String },
});

// collection => viewers
const viewerModel = mongoose.model("Viewer", viewerSchema);

// collection => films
const filmModel = mongoose.model("Film", filmSchema);

async function main() {
  await mongoose.connect(
    "mongodb+srv://test:GfeKCRmv6TuUUGkE@cluster0-xdiea.gcp.mongodb.net/database_advanced?retryWrites=true&w=majority"
  );

  await filmModel.deleteMany();
  await viewerModel.deleteMany();

  const films = await filmModel.create(
    { name: "Titanic", genre: "drama" },
    { name: "Lord of the Rings", genre: "fantasy" },
    { name: "The King's Speech", genre: "drama" },
    { name: "Gentleman", genre: "Action" },
    { name: null }
  );

  const filmIds = films.map((film) => film._id);

  await viewerModel.create(
    { name: "Ivan", favouriteFilmIds: [filmIds[0], filmIds[2], filmIds[4]] },
    { name: "Igor", favouriteFilmIds: [filmIds[0], filmIds[1], filmIds[2]] },
    { name: "Vasil" }
  );

  console.log(
    await viewerModel.aggregate([
      {
        $lookup: {
          from: "films",
          localField: "favouriteFilmIds",
          foreignField: "_id",
          as: "favouriteFilms",
        },
      },
      // { $skip: 1 },
      // { $limit: 1 },
      // { $unwind: "$favouriteFilms" },
    ])
  );
  console.log(
    await viewerModel.find({ name: "Vasil" }).populate("favouriteFilmIds")
  );
}

main();
