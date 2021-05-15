const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../users/user.model");
const { errorWrapper } = require("./error-wrapper");

exports.authorize = errorWrapper(async (req, res, next) => {
  // 1. get token from header +
  // 2. verify token +
  // 3. if error or user does not exist - throw 401 +
  // 4. set req.user
  // 5. path execution to next middleware
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace("Bearer ", "");
    const { JWT_SECRET } = process.env;

    const { uid } = jwt.verify(token, JWT_SECRET);
    const user = await UserModel.findById(uid);
    if (!user) {
      throw new Unauthorized();
    }

    req.user = user;
    next();
  } catch (err) {
    throw new Unauthorized();
  }
});
