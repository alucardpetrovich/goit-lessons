const express = require('express');
const Joi = require('joi');
const { default: axios } = require('axios');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// app.use((req, res, next) => {
//   res.set('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN);
//   next();
// });

// app.options('/*', (req, res, next) => {
//   res.set('Access-Control-Allow-Methods', req.get('Access-Control-Request-Method'));
//   res.set('Access-Control-Allow-Headers', req.get('Access-Control-Request-Headers'));

//   return res.status(200).send();
// });

app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));

// Endpoint - METHOD + URL
app.get('/weather', validateGetWeather, async (req, res, next) => {
  // 1. validate req data +
  // 2. send request on Open Weather Map +
  // 3. send successful response +

  const { lat, lon } = req.query;
  const { OPEN_WEATHER_API_TOKEN } = process.env;
  const weatherResult = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_TOKEN}&units=metric`);

  return res.send(weatherResult.data);
});

function validateGetWeather(req, res, next) {
  const query = req.query;

  // if (isNaN(lon) || lon > 180 || lon < -180) {
  //   throw new Error();
  // }
  // if (isNaN(lat) || lat > 90 || lat < -90) {
  //   throw new Error();
  // }
  const schema = Joi.object({
    lat: Joi.number().min(-90).max(90).required(),
    lon: Joi.number().min(-180).max(180).required(),
  });

  const result = schema.validate(query);
  if (result.error) {
    return res.status(400).send(result);
  }

  next();
}

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log('Started listening on port', PORT);
});
