import "reflect-metadata";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import express, { NextFunction, Request, Response } from "express";
import { ForecastParamsDto } from "./forecast-params.dto";
import dotenv from "dotenv";
import path from "path";
import axios from "axios";

dotenv.config({ path: path.join(__dirname, "../.env") });

const server = express();

server.get("/forecast", validateForecastParams, async (req, res, next) => {
  // const lon = parseFloat(String(req.query.lon));
  // const lat = parseFloat(String(req.query.lat));
  // const isLonValid = lon > -180 && lon < 180;
  // const isLatValid = lat > -90 && lat < 90;
  // if (!isLonValid || !isLatValid) {
  //   return res.status(400).send("Wrong coordinates");
  // }
  const { lon, lat } = req.query;

  const result = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`,
    { headers: { "x-api-key": process.env.OPEN_WEATHER_MAP_API_KEY } }
  );

  res.send(result.data);
});

async function validateForecastParams(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const dto = plainToInstance(ForecastParamsDto, req.query, {
    enableImplicitConversion: true,
  });

  const errors = await validate(dto, { forbidNonWhitelisted: true });
  if (errors.length) {
    return res.status(400).send(errors);
  }

  req.query = dto as any;

  next();
}

const { PORT } = process.env;
server.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
