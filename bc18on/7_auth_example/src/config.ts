import * as convict from "convict";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.join(__dirname, "../.env") });

const config = convict({
  port: {
    doc: "Port to listen for clients requests",
    format: Number,
    default: 3000,
    env: "PORT",
  },
  dbUrl: {
    doc: "MongoDB connection URL",
    format: String,
    default: "",
    env: "DB_URL",
  },
  saltRounds: {
    doc: "Bcrypt salt rounds",
    format: Number,
    default: 12,
    env: "BCRYPT_SALT_ROUNDS",
  },
  jwt: {
    secret: {
      doc: 'JWT secret, used for token verification and generation',
      format: String,
      default: '',
      env: "JWT_SECRET",
    },
    expiresIn: {
      doc: "JWT token expiration time",
      format: String,
      default: '2d',
      env: "JWT_EXPIRES_IN"
    }
  }
});

export const conf = config.validate({ allowed: "strict" }).getProperties();
