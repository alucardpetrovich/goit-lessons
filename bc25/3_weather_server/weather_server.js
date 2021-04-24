const dotenv = require("dotenv");
const path = require("path");
const express = require("express");
const Joi = require("joi");
const { default: axios } = require("axios");

dotenv.config({ path: path.join(__dirname, ".env") });

const server = express();

server.get("/weather", validateGetWeatherParams, async (req, res) => {
  const { ln, lat } = req.query;
  const { OPEN_WEATHER_API_KEY } = process.env;

  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${ln}&appid=${OPEN_WEATHER_API_KEY}`
  );

  res.send(response.data);
});

// /weather?ln=110&lat=80
function validateGetWeatherParams(req, res, next) {
  const schema = Joi.object({
    ln: Joi.number().min(-180).max(180).required(),
    lat: Joi.number().min(-90).max(90).required(),
  });

  const { error } = schema.validate(req.query);
  if (error) {
    return res.status(400).send(error);
  }

  next();
}

const { PORT } = process.env;
server.listen(PORT, () => {
  console.log("Server started listening on port", PORT);
});
