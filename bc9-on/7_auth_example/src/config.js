exports.getConfig = function () {
  const { PORT, DATABASE_URL, BCRYPT_SALT_ROUNDS, JWT_SECRET, JWT_EXPIRES_IN } =
    process.env;

  return {
    api: {
      port: PORT,
      saltRounds: parseInt(BCRYPT_SALT_ROUNDS),
    },
    jwt: {
      secret: JWT_SECRET,
      expiresIn: JWT_EXPIRES_IN,
    },
    database: { url: DATABASE_URL },
  };
};
