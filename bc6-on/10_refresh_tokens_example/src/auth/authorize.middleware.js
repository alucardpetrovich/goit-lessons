const { asyncWrapper } = require("../helpers/async-wrapper");
const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
const { UserModel } = require("../users/user.model");
const { TOKEN_TYPES } = require("./token-types");

exports.authorize = asyncWrapper(async (req, res, next) => {
  // 1. get token from request +
  // 2. verify token +
  // 3. if token verification failed - throw 401 (Unauthorized) +
  // 4. get user by id from payload +
  // 5. if no user - throw 401 +
  // 6. set req.user +
  // 7. call next +

  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace("Bearer ", "");

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.type !== TOKEN_TYPES.SESSION) {
      throw new Unauthorized();
    }

    const user = await UserModel.findById(payload.id);
    if (!user) {
      throw new Unauthorized();
    }

    req.user = user;
    req.token = token;

    next();
  } catch (err) {
    next(new Unauthorized());
  }
});
