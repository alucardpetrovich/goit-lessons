exports.getConfig = () => {
  const { PORT, MONGODB_URI, BCRYPT_SALT_ROUNDS, JWT_SECRET, JWT_EXPIRES_IN } =
    process.env;

  return {
    port: PORT,
    database: { url: MONGODB_URI },
    bcrypt: { saltRounds: parseInt(BCRYPT_SALT_ROUNDS) },
    jwt: { secret: JWT_SECRET, expiresIn: JWT_EXPIRES_IN },
  };
};
