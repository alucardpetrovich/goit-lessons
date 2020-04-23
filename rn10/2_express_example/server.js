const express = require("express");
const Joi = require("joi");
const dotenv = require("dotenv");
const path = require("path");
const fetch = require("node-fetch");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const FRONTEND_URL = "http://localhost:3000";

console.log(
  "process.env.DARKSKY_API_SECRET before",
  process.env.DARKSKY_API_SECRET
);

dotenv.config({ path: path.join(__dirname, ".env") });

console.log(
  "process.env.DARKSKY_API_SECRET after",
  process.env.DARKSKY_API_SECRET
);

const server = express();

server.use(cors({ origin: FRONTEND_URL })); // cors with cors lib

//////////// Plain cors start
server.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", FRONTEND_URL);
  next();
});

server.options("*", (req, res, next) => {
  res.set(
    "Access-Control-Allow-Methods",
    req.header("Access-Control-Request-Method")
  );
  res.set(
    "Access-Control-Allow-Headers",
    req.header("Access-Control-Request-Headers")
  );
  next();
});
//////////// Plain cors end

server.get("/", validateForecast, async (req, res, next) => {
  const { ln, lat } = req.query;
  const forecast = await sendForecaseRequest(ln, lat);

  return res.status(200).json(forecast);
});

function validateForecast(req, res, next) {
  const forecashRules = Joi.object({
    ln: Joi.string().required(),
    lat: Joi.string().required(),
  });

  const validationResult = Joi.validate(req.query, forecashRules);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error);
  }

  next();
}

async function sendForecaseRequest(ln, lat) {
  const uri = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_SECRET}/${lat},${ln}`;

  const forecastResponse = await fetch(uri);

  return forecastResponse.json();
}

server.listen(PORT, () => {
  console.log("Server started listening on port", PORT);
});
