const Router = require("express").Router;
const filmController = require("./films.controller");

const filmsRouter = Router();

filmsRouter.get("/", filmController.getAllFilms);

module.exports = filmsRouter;
