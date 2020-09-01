const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const Joi = require("joi");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));

const forecastScheme = Joi.object({
  lat: Joi.number().min(-90).max(90).required(),
  ln: Joi.number().min(-180).max(180).required(),
});

// console.log("process.env.DARKSKY_API_TOKEN", process.env.DARKSKY_API_TOKEN);

app.get("/forecast", validate(forecastScheme), async (req, res, next) => {
  const { lat, ln } = req.query;

  const result = await axios.get(
    `https://api.darksky.net/forecast/${process.env.DARKSKY_API_TOKEN}/${lat},${ln}?exclude=minutely,hourly,daily,alerts,flags?exclude=minutely,hourly,daily,alerts,flags`
  );

  res.status(200).send(result.data);
});

function validate(scheme) {
  return (req, res, next) => {
    const validationResult = scheme.validate(req.query);
    if (validationResult.error) {
      return res.status(400).send(validationResult.error);
    }

    next();
  };
}

app.listen(process.env.PORT, () => {
  console.log("started listening on port", process.env.PORT);
});
