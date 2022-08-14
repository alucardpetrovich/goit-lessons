const express = require("express");
const Joi = require("joi");
const dotenv = require("dotenv");
const path = require("path");
const { default: axios } = require("axios");
const cors = require("cors");
// import axios from 'axios';

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

const { ALLOWED_ORIGIN } = process.env;
app.use(cors({ origin: ALLOWED_ORIGIN }));

// app.use((req, res, next) => {
//   const { ALLOWED_ORIGIN } = process.env;
//   res.set("Access-Control-Allow-Origin", ALLOWED_ORIGIN);

//   next();
// });

// app.options("/*", (req, res, next) => {
//   res.set(
//     "Access-Control-Allow-Methods",
//     req.get("Access-Control-Request-Method")
//   );
//   res.set(
//     "Access-Control-Allow-Headers",
//     req.get("Access-Control-Request-Headers")
//   );

//   res.status(204).send();
// });

// GET + /api/v1/forecast - endpoint
app.get("/api/v1/forecast", validateForecastParams, async (req, res, next) => {
  const { lon, lat } = req.query;
  const appid = process.env.OPEN_WEATHER_MAP_API_KEY;

  const forecastResponse = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}`
  );

  res.send(forecastResponse.data);
});

function validateForecastParams(req, res, next) {
  const schema = Joi.object({
    lon: Joi.number().min(-180).max(180).required(),
    lat: Joi.number().min(-90).max(90).required(),
  });

  const result = schema.validate(req.query);
  if (result.error) {
    return res.status(400).send(result.error);
  }

  req.query = result.value;
  next();
}

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log("Started listening on port", PORT);
});
