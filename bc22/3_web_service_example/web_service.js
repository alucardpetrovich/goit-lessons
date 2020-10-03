const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const Joi = require("joi");
const { default: axios } = require("axios");

const server = express();

server.get("/forecast", validateForecast, async (req, res, next) => {
  const { lon, lat } = req.query;
  const response = await axios.get(
    `https://api.darksky.net/forecast/${process.env.DARKSKY_API_TOKEN}/${lat},${lon}?exclude=minutely,hourly,daily,alerts,flags`
  );

  res.status(200).send(response.data);
});

function validateForecast(req, res, next) {
  const forecastSchema = Joi.object({
    lon: Joi.number().min(-180).max(180).required(),
    lat: Joi.number().min(-90).max(90).required(),
  });

  const validationResult = forecastSchema.validate(req.query);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error);
  }

  next();
}

server.listen(process.env.PORT, () => {
  console.log("Server started on port", process.env.PORT);
});
