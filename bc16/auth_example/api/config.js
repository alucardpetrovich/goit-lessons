const PORT = process.env.PORT || 3000;
require("dotenv").config();

export const config = {
  port: PORT,
  mongodb_url: process.env.MONGODB_URL,
  jwtSecret: process.env.JWT_SECRET,

  oAuthGoogle: {
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL
  }
};
