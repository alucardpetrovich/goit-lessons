exports.getConfig = () => {
  const {
    PORT,
    ALLOWED_ORIGIN,
    MONGODB_URL,
    BCRYPT_SALT_ROUNDS,
    JWT_SECRET,
    JWT_EXPIRES_IN,
  } = process.env;

  return {
    port: PORT,
    cors: {
      origin: ALLOWED_ORIGIN,
    },
    db: {
      url: MONGODB_URL,
    },
    bcrypt: {
      saltRounds: parseInt(BCRYPT_SALT_ROUNDS),
    },
    jwt: {
      secret: JWT_SECRET,
      expiresIn: JWT_EXPIRES_IN,
    },
  };
};
