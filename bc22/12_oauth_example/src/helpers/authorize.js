const jwt = require("jsonwebtoken");
const { Unauthorized } = require("../helpers/errors/Unauthorized.error");
const { UserModel } = require("../users/user.model");

exports.authorize = async (req, res, next) => {
  // 1. get token from request +
  // 2. verify jwt token +
  // 3. get corresponding user +
  // 4. write user to req.user prop +
  // 5. pass execution to next middleware +
  try {
    const { token } = req.cookies;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
  
    const user = await UserModel.findById(payload.userId);
    if (!user) {
      throw new Unauthorized();
    }

    req.user = user;
    next();

  } catch (err) {
    next(new Unauthorized('Token is not valid'));
  }
};
