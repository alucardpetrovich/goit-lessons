const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const Joi = require("joi");
const cors = require("cors");
const morgan = require("morgan");
// import axios from 'axios';
// module.exports.default === export default
const { default: axios } = require("axios");

const server = express();

server.use(cors({ origin: process.env.ALLOWED_ORIGIN }));
server.use(morgan("tiny"));

// server.use((req, res, next) => {
//   res.set("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN);
//   next();
// });

// server.options("/*", (req, res, next) => {
//   res.set(
//     "Access-Control-Allow-Methods",
//     req.get("Access-Control-Request-Method")
//   );
//   res.set(
//     "Access-Control-Allow-Headers",
//     req.set("Access-Control-Request-Headers")
//   );

//   return res.status(200).send();
// });

server.get("/forecast", validateForecastParams, getForecast);

function validateForecastParams(req, res, next) {
  const forecastSchema = Joi.object({
    lat: Joi.number().min(-90).max(90).required(),
    lon: Joi.number().min(-180).max(180).required(),
  });

  const validationResult = forecastSchema.validate(req.query);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error);
  }

  next();
}

async function getForecast(req, res, next) {
  // lat, lon
  const { lon, lat } = req.query;
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&lon=${lon}&lat=${lat}&appid=${process.env.OPEN_WEATHER_API_KEY}`
  );

  return res.status(200).send(response.data);
}

server.listen(process.env.PORT, () => {
  console.log("Server started listening on port", process.env.PORT);
});
