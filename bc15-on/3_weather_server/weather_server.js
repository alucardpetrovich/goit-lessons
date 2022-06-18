const express = require("express");
const Joi = require("joi");
const dotenv = require("dotenv");
const path = require("path");
const { default: axios } = require("axios");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

app.get("/forecast", validateForecast, async (req, res, next) => {
  // 1. lon, lat - validate
  // 2. send request to third-party service
  // 3. send successful response
  const { lat, lon } = req.query;
  const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;

  const forecastResponse = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
  );

  res.status(200).send(forecastResponse.data);
});

function validateForecast(req, res, next) {
  const schema = Joi.object({
    lon: Joi.number().min(-180).max(180).required(),
    lat: Joi.number().min(-90).max(90).required(),
  });

  const validationRes = schema.validate(req.query);
  if (validationRes.error) {
    return res.status(400).send(validationRes.error);
  }

  req.query = validationRes.value;
  next();
}

app.listen(process.env.PORT, () => {
  console.log("Server started listening on port", process.env.PORT);
});
