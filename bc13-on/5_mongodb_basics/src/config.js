exports.getConfig = () => {
  const { PORT, MONGODB_URI } = process.env;

  return {
    port: PORT,
    database: { url: MONGODB_URI },
  };
};
