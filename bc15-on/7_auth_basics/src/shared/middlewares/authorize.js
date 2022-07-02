const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
const { getConfig } = require("../../config");

exports.authorizeWithAuthorizationHeader = () => {
  return (req, res, next) => {
    // 1. extract token from `Authorization` header +
    // 2. verify JWT-token
    // 3. add userId to req object
    // 4. call next
    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace("Bearer ", "");
    const conf = getConfig();

    let payload;
    try {
      payload = jwt.verify(token, conf.jwt.secret);
    } catch (err) {
      return next(new Unauthorized());
    }

    req.userId = payload.userId;
    next();
  };
};

exports.authorizeWithCookies = () => {
  return (req, res, next) => {
    const token = req.cookies.token;
    const conf = getConfig();

    let payload;
    try {
      payload = jwt.verify(token, conf.jwt.secret);
    } catch (err) {
      return next(new Unauthorized());
    }

    req.userId = payload.userId;
    next();
  };
};
