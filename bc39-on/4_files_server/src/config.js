const dotenv = require("dotenv");
const path = require("path");

let config;

exports.getConfig = () => {
  if (config) {
    return config;
  }

  dotenv.config({ path: path.join(__dirname, "../.env") });

  config = {
    db: { url: process.env.MONGODB_URI },
    port: parseInt(process.env.PORT) || 3000,
    serverBaseUrl: process.env.SERVER_BASE_URL,
    bcryptCostFactor: parseInt(process.env.BCRYPT_COST_FACTOR),
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
      accessExpiresIn: process.env.ACCESS_JWT_EXPIRES_IN,
      refreshExpiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
    },
    redis: { url: process.env.REDIS_URL },
    twilio: {
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
      fromNumber: process.env.TWILIO_FROM_NUMBER,
    },
  };

  return config;
};
