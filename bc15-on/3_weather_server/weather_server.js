const express = require("express");
const Joi = require("joi");
const dotenv = require("dotenv");
const path = require("path");
const { default: axios } = require("axios");
const cors = require("cors");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));

// app.use((req, res, next) => {
//   res.set("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN);
//   next();
// });

// app.options("*", (req, res, next) => {
//   res.set(
//     "Access-Control-Allow-Methods",
//     req.headers["access-control-allow-methods"]
//   );
//   res.set(
//     "Access-Control-Allow-Headers",
//     req.headers["access-control-allow-headers"]
//   );

//   res.status(200).send();
// });

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
