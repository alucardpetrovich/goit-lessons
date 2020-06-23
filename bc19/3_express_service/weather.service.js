const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, ".env") });

const express = require("express");
const Joi = require("@hapi/joi");
const axios = require("axios");
const cors = require("cors");

const PORT = process.env.PORT || 3010;
const ALLOWED_ORIGIN = "http://localhost:3000";

const app = express();

console.log(process.env);

/////// native CORS
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  next();
});

app.options((req, res, next) => {
  res.set("Access-Control-Allow-Methods", "POST, PUT, DELETE, GET");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  return res.send();
});
//////// END native CORS

//////// CORS lib
app.use(cors({ origin: ALLOWED_ORIGIN }));

app.get("/weather", validateWeatherParams, getWeather);

function validateWeatherParams(req, res, next) {
  const weatherParamsSchema = Joi.object({
    lat: Joi.number().max(90).min(-90).required(),
    ln: Joi.number().max(180).min(-180).required(),
  });

  const result = weatherParamsSchema.validate(req.query, { convert: true });
  if (result.error) {
    return res.status(400).json(result.error);
  }

  next();
}

async function getWeather(req, res, next) {
  const { lat, ln } = req.query;

  const response = await axios.get(
    `https://api.darksky.net/forecast/${process.env.DARKSKY_API_TOKEN}/${lat},${ln}?exclude=minutely,hourly,flags,alerts`
  );

  return res.json(response.data);
}

app.listen(PORT, () => {
  console.log("Server started listening on port", PORT);
});
