import { config } from "dotenv";
import { join } from "path";
import { DataSourceOptions } from "typeorm";

config({ path: join(__dirname, "../.env") });

export interface Config {
  port: number;
  db: DataSourceOptions;
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
  };
}
