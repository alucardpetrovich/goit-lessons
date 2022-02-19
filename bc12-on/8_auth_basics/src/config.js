exports.getConfig = () => {
  return {
    port: process.env.PORT || 3000,
    allowedCorsOrigin: process.env.ALLOWED_CORS_ORIGIN,
    dbUrl: process.env.MONGODB_URI,
    bcryptCostFactor: parseInt(process.env.BCRYPT_COST_FACTOR) || 8,
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    },
  };
};
