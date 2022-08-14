import * as dotenv from "dotenv";
import * as path from "path";
import * as convict from "convict";

dotenv.config({ path: path.join(__dirname, "../.env") });

const config = convict({
  port: {
    doc: "A port for clients requests listening",
    default: 3000,
    format: Number,
    env: "PORT",
  },
  allowedOrigin: {
    doc: "Allowed CORS origin",
    format: String,
    default: '',
    env: "ALLOWED_ORIGIN",
  },
});

export const conf = config.validate({ allowed: "strict" }).getProperties();
