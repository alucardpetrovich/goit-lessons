import express from "express";
import Joi from "joi";
import axios from "axios";
import dotenv from "dotenv";
import path from "path";

const { pathname } = new URL(import.meta.url);
const __dirname = path.dirname(pathname);

dotenv.config({ path: path.join(__dirname, ".env") });
const server = express();

server.get("/weather", validateGetWeather, async (req, res) => {
  const { ln, lat } = req.query;
  const forecastResponse = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${ln}&appid=${process.env.OPEN_WEATHER_API_KEY}`
  );

  res.send(forecastResponse.data);
});

function validateGetWeather(req, res, next) {
  const getWeatherSchema = Joi.object({
    ln: Joi.number().min(-180).max(180).required(),
    lat: Joi.number().min(-90).max(90).required(),
  });

  const validationResult = getWeatherSchema.validate(req.query);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error);
  }

  next();
}

server.listen(process.env.PORT, () => {
  console.log("Server started listening on port", process.env.PORT);
});
