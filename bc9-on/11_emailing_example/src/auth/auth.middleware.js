const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { getConfig } = require("../config");
const { UserModel } = require("../users/user.model");

exports.authorize = () => {
  return async (req, res, next) => {
    // 1. get token from headers +
    // 2. verify jwt token. If verification failed - throw 401 error +
    // 3. get user +
    // 4. if user not found - throw an 401 error +
    // 5. set req.user +
    // 6. call next +

    try {
      const authHeader = req.get("Authorization");
      const token = authHeader.replace("Bearer ", "");

      const config = getConfig();
      const payload = jwt.verify(token, config.jwt.secret);

      const user = await UserModel.findUser({ id: payload.sub });
      if (!user) {
        throw new Unauthorized();
      }

      req.user = user;
      next();
    } catch (err) {
      const statusCode = err.status || 401;
      return res.status(statusCode).send();
    }
  };
};
