exports.getConfig = () => {
  return {
    port: process.env.PORT || 3000,
    allowedCorsOrigin: process.env.ALLOWED_CORS_ORIGIN,
    dbUrl: process.env.MONGODB_URI,
    bcryptCostFactor: parseInt(process.env.BCRYPT_COST_FACTOR) || 8,
    baseUrl: process.env.SERVER_BASE_URL,
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    },
    mailer: {
      user: process.env.NODEMAILER_LOGIN,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  };
};
