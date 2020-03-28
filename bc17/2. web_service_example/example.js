const express = require("express");
const Joi = require("joi");
const dotenv = require("dotenv");

const app = express();
const PORT = 3000;

dotenv.config();
console.log("process.env", process.env);

app.use(express.json());

app.get("/hello", (req, res, next) => {
  console.log("req.body", req.body);
  res.send("Hello world!!!");
});

app.get(
  "/weather",
  (req, res, next) => {
    const weatherRules = Joi.object({
      lat: Joi.string().required(),
      lon: Joi.string().required()
    });

    const validationResult = Joi.validate(req.query, weatherRules);

    if (validationResult.error) {
      return res.status(400).send(validationResult.error);
    }

    next();
  },
  (req, res, next) => {
    console.log("req.query", req.query);
    res.json({ weather: "test" });
  }
);

app.listen(PORT, () => {
  console.log("Started listening on port", PORT);
});
