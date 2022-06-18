exports.getConfig = () => {
  const { PORT, ALLOWED_ORIGIN } = process.env;

  return {
    port: PORT,
    cors: {
      origin: ALLOWED_ORIGIN,
    },
  };
};
