exports.getConfig = () => {
  const { PORT } = process.env;

  return {
    api: {
      port: PORT,
    },
  };
};
