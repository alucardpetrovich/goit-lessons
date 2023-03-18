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
  };

  return config;
};
