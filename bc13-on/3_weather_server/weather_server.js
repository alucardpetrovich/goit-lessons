const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");
const { default: axios } = require("axios");
const { catchErrors } = require("./catch-errors");
// import axios from axios;

dotenv.config({ path: path.join(__dirname, ".env") });
const { PORT, OPEN_WEATHER_MAP_API_KEY } = process.env;

const server = express();

// Endpoint -> HTTP Method + path (/users/1)
server.get(
  "/forecast",
  validateForecastReqData,
  catchErrors(async (req, res, next) => {
    // 1. validate request +
    // 2. create open weather account +
    // 3. send request to open weather API +
    // 4. send successful response +
    const { lon, lat } = req.query;

    const forecastRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lon=${lon}&lat=${lat}&appid=${OPEN_WEATHER_MAP_API_KEY}`
    );

    res.send(forecastRes.data);
  })
);

function validateForecastReqData(req, res, next) {
  const forecastSchema = Joi.object({
    lon: Joi.number().min(-180).max(180).required(),
    lat: Joi.number().min(-90).max(90).required(),
  });

  const result = forecastSchema.validate(req.query);
  if (result.error) {
    return res.status(400).send(result.error);
  }

  next();
}

server.listen(PORT, () => {
  console.log("Server started listening on port", PORT);
});
