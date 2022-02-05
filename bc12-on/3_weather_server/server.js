const express = require("express");
const Joi = require("joi");
const dotenv = require("dotenv");
const path = require("path");
const axios = require("axios").default;

dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();

app.get("/weather", validateWeatherRequest, async (req, res, next) => {
  // 1. validate req params +
  // 2. register account on OpenWeather API +
  // 3. add .env file with env vars +
  // 4. send request to OpenWeatherMap +
  // 5. send response to client +
  // 6. deploy application to Heroku

  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${req.query.lat}&lon=${req.query.ln}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
  );
  return res.status(200).send(response.data);
});

function validateWeatherRequest(req, res, next) {
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

app.listen(process.env.PORT, () => {
  console.log("Server started listening on port", process.env.PORT);
});
