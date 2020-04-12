const filmModel = require("./films.model");

class FilmController {
  async getAllFilms(req, res, next) {
    const films = await filmModel.find().sort({ name: 1 }).skip(2).limit(3);

    return res.status(200).json(films);
  }
}

module.exports = new FilmController();
