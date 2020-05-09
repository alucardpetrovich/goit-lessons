const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const Validator = require("node-validator");
const Joi = require("@hapi/joi");
const axios = require("axios");
const cors = require("cors");

const PORT = process.env.PORT || 3010;
const ALLOWED_ORIGIN = "http://localhost:3000";

const server = express();

server.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  next();
});

server.options((req, res, next) => {
  res.set(
    "Access-Control-Allow-Methods",
    req.get("Access-Control-Request-Method")
  );
  res.set(
    "Access-Control-Allow-Headers",
    req.get("Access-Control-Request-Headers")
  );

  return res.status(200).send();
});

// server.use(cors({ origin: ALLOWED_ORIGIN }));

server.get("/forecast", validateForecastParamsJoi, async (req, res, next) => {
  const { ln, lat } = req.query;
  const forecastResponse = await sendForecastRequest(ln, lat);

  return res.json(forecastResponse);
});

function validateForecastParams(req, res, next) {
  const forecastRules = Validator.isObject()
    .withRequired("ln", Validator.isNumber({ min: -180, max: 180 }))
    .withRequired("lat", Validator.isNumber({ min: -90, max: 90 }));

  const parsedQuery = {
    ln: parseFloat(req.query.ln),
    lat: parseFloat(req.query.lat),
  };

  Validator.run(forecastRules, parsedQuery, (errCount, errors) => {
    if (errCount) {
      return res.status(400).json(errors);
    }

    next();
  });
}

function validateForecastParamsJoi(req, res, next) {
  const forecastRules = Joi.object({
    ln: Joi.number().min(-180).max(180).required(),
    lat: Joi.number().min(-90).max(90).required(),
  });

  const parsedQuery = {
    ln: parseFloat(req.query.ln),
    lat: parseFloat(req.query.lat),
  };

  const validationResult = forecastRules.validate(parsedQuery);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error);
  }

  next();
}

async function sendForecastRequest(ln, lat) {
  const forecastResponse = await axios.get(
    `https://api.darksky.net/forecast/${process.env.DARKSKY_API_TOKEN}/${lat},${ln}?exclude=hourly,daily`
  );

  return forecastResponse.data;
}

server.listen(PORT, () => {
  console.log("Server started listening on port", PORT);
});
