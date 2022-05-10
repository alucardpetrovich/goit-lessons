const { catchErrors } = require("./catch-errors");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { getConfig } = require("../../config");

exports.authorize = catchErrors((req, res, next) => {
  // Authorization: Bearer <token>
  // 1. get token from header
  // 2. verify jwt token
  // 3. if verification failed - throw 401
  // 4. set req.userId
  // 5. call next
  try {
    const authorizationHeader = req.headers.authorization || "";
    const token = authorizationHeader.replace("Bearer ", "");

    const config = getConfig();
    const payload = jwt.verify(token, config.jwt.secret);

    req.userId = payload.sub;
    next();
  } catch (err) {
    throw new Unauthorized("User is not authorized");
  }
});
