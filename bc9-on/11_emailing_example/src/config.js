exports.getConfig = function () {
  const {
    PORT,
    DATABASE_URL,
    BCRYPT_SALT_ROUNDS,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    SENDGRID_API_KEY,
    SENDGRID_SENDER,
    SERVER_URL,
  } = process.env;

  return {
    api: {
      port: PORT,
      saltRounds: parseInt(BCRYPT_SALT_ROUNDS),
      url: SERVER_URL,
    },
    jwt: {
      secret: JWT_SECRET,
      expiresIn: JWT_EXPIRES_IN,
    },
    database: { url: DATABASE_URL },
    sendgrid: { apiKey: SENDGRID_API_KEY, sender: SENDGRID_SENDER },
  };
};
