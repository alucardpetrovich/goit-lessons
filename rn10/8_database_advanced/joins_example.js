const Sequelize = require("sequelize");

const dbConnection = new Sequelize({
  host: "",
  database: "",
  username: "",
  password: "",
  dialect: "postgres",
});

async function main() {
  await dbConnection.authenticate();

  // table name -> Viewers
  const viewerModel = dbConnection.define("Viewer", {
    name: { type: Sequelize.STRING, allowNull: false },
  });

  const favouriteFilm = dbConnection.define("FavouriteFilm", {
    ViewerId: { type: Sequelize.INTEGER, allowNull: false },
    FilmId: { type: Sequelize.INTEGER, allowNull: false },
  });

  // table name -> Films
  const filmModel = dbConnection.define("Film", {
    name: { type: Sequelize.STRING, allowNull: true },
    genre: { type: Sequelize.STRING, allowNull: true },
  });

  favouriteFilm.belongsTo(viewerModel);
  favouriteFilm.belongsTo(filmModel);
  viewerModel.hasMany(favouriteFilm);

  await dbConnection.sync({ force: true });

  const films = await filmModel.bulkCreate([
    { name: "Titanic", genre: "drama" },
    { name: "Lord of the Rings", genre: "fantasy" },
    { name: "The King's Speech", genre: "drama" },
    { name: "Gentleman", genre: "Action" },
    { name: null },
  ]);

  const filmIds = films.map((film) => film.id);

  const viewers = await viewerModel.bulkCreate([
    { name: "Ivan" },
    { name: "Igor" },
    { name: "Vasil" },
  ]);
  const viewerIds = viewers.map((viewer) => viewer.id);

  await favouriteFilm.bulkCreate([
    { ViewerId: viewerIds[0], FilmId: filmIds[0] },
    { ViewerId: viewerIds[0], FilmId: filmIds[3] },
    { ViewerId: viewerIds[2], FilmId: filmIds[2] },
  ]);

  console.log(
    await viewerModel.findAll({
      include: [
        {
          model: favouriteFilm,
          include: [
            {
              model: filmModel,
            },
          ],
        },
      ],
    })
  );
}

// const viewerSchema = new Schema({
//   name: { type: String, required: true },
//   favouriteFilmIds: [{ type: Types.ObjectId, ref: "Film" }],
// });

// const filmSchema = new Schema({
//   name: { type: String },
//   genre: { type: String },
// });

main();
