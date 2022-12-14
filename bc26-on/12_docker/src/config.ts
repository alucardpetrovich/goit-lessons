import { config } from "dotenv";
import { join } from "path";
import { DataSourceOptions } from "typeorm";

config();

export interface Config {
  port: number;
  db: DataSourceOptions;
  bcrypt: {
    costFactor: number;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
}

export function getConfig(): Config {
  return {
    port: parseInt(process.env.PORT || "3000"),
    db: {
      type: "postgres",
      url: process.env.POSTGRES_URL || "",
      migrations: [`${join(__dirname, "./migrations")}/**/*.{js,ts}`],
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
    },
    bcrypt: {
      costFactor: parseInt(process.env.BCRYPT_COST_FACTOR || "6"),
    },
    jwt: {
      secret: process.env.JWT_SECRET || "",
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    },
  };
}
