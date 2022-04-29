exports.getConfig = () => {
  const { PORT } = process.env;

  return {
    port: PORT,
  };
};
