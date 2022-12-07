import { config } from "dotenv";
import { join } from "path";

config({ path: join(__dirname, "../.env") });

export interface Config {
  port: number;
}

export function getConfig(): Config {
  return {
    port: parseInt(process.env.PORT || "3000"),
  };
}