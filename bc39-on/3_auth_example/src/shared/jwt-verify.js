const { getConfig } = require("../config");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

exports.verifyJwt = (token) => {
  const { jwt: jwtConfig } = getConfig();

  let payload;
  try {
    payload = jwt.verify(token, jwtConfig.secret);
  } catch (err) {
    throw new Unauthorized();
  }

  return payload;
};
