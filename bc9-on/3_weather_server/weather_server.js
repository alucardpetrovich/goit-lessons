const express = require("express");
const Joi = require("joi");
const requestIp = require("request-ip");
const geoip = require("geoip-lite");
const dotenv = require("dotenv");
const path = require("path");
const { default: axios } = require("axios");

dotenv.config({ path: path.join(__dirname, ".env") });

const server = express();

server.get("/forecast", validateForecastParams, async (req, res, next) => {
  // 1. validate lg, lat
  // 2. if user haven't provided coords -> then take coords from his IP address
  // 3. send request to Open Weather Map
  // 4. send successful response to client
  let { lg, lat } = req.query;
  if (!lg || !lat) {
    const ip = requestIp.getClientIp(req);
    const geo = geoip.lookup(ip);
    if (!geo || !geo.ll) {
      return res.status(400).send("Error in IP address parsing");
    }

    [lat, lg] = geo.ll;
  }

  const { OPEN_WEATHER_MAP_API_KEY, OPEN_WEATHER_MAP_BASE_URL } = process.env;
  const weatherResponse = await axios.get(
    `${OPEN_WEATHER_MAP_BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lg}&appid=${OPEN_WEATHER_MAP_API_KEY}&units=metric`
  );

  return res.status(200).send(weatherResponse.data);
});

function validateForecastParams(req, res, next) {
  const forecastParamsSchema = Joi.object({
    lg: Joi.number().min(-180).max(180).optional(),
    lat: Joi.number().min(-90).max(90).optional(),
  }).with("lg", "lat");

  const validationResult = forecastParamsSchema.validate(req.query);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error);
  }

  next();
}

const { PORT } = process.env;
server.listen(PORT, () => {
  console.log("Started listening on port", PORT);
});
