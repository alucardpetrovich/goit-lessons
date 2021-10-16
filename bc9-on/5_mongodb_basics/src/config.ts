export const getConfig = () => {
  const { PORT, DATABASE_URL } = process.env;

  return {
    api: {
      port: PORT || "",
    },
    database: {
      url: DATABASE_URL || "",
    },
  };
};
