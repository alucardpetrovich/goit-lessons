exports.getConfig = () => {
  return {
    port: process.env.PORT || 3000,
    allowedCorsOrigin: process.env.ALLOWED_CORS_ORIGIN,
  };
};
