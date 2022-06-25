exports.getConfig = () => {
  const { PORT, ALLOWED_ORIGIN, MONGODB_URL } = process.env;

  return {
    port: PORT,
    cors: {
      origin: ALLOWED_ORIGIN,
    },
    db: {
      url: MONGODB_URL,
    },
  };
};
