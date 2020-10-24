const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const Joi = require("joi");
const { default: axios } = require("axios");
const { request } = require("express");

const server = express();

// server.use((req, res, next) => {
//   res.set("Access-Control-Allow-Origin", process.env.ORIGIN);
// });

// server.options((req, res, next) => {
//   res.set(
//     "Access-Control-Allow-Methods",
//     req.headers["Access-Control-Request-Method"]
//   );
//   res.set(
//     "Access-Control-Allow-Headers",
//     req.headers["Access-Control-Request-Headers"]
//   );

//   return res.status(200).send();
// });

// DO NOT USE LIKE THAT
// server.use(cors());

server.use(cors({ origin: process.env.ORIGIN }));

server.get("/forecast", validateForecast, getForecast);

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

async function getForecast(req, res, next) {
  const { lon, lat } = req.query;
  const response = await axios.get(
    `https://api.darksky.net/forecast/${process.env.DARKSKY_API_TOKEN}/${lat},${lon}?exclude=minutely,hourly,daily,alerts,flags`
  );

  res.status(200).send(response.data);
}

if (require.main === module) {
  server.listen(process.env.PORT, () => {
    console.log("Server started on port", process.env.PORT);
  });
} else {
  exports.getForecast = getForecast;
}
