const jwt = require("jsonwebtoken");
const { UserModel } = require("../users/user.model");
const { asyncWrapper } = require("./async-wrapper");
const { Unauthorized } = require("./errors");

exports.authorize = asyncWrapper(async (req, res, next) => {
  // 1. get token +
  // 2. verify jwt-token +
  // 3. find corresponding user for that token +
  // 4. write user object to req.user
  // 5. pass request execution to next middleware

  const authHeader = req.get("Authorization") || "";
  const token = authHeader.replace("Bearer ", "");

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new Unauthorized("Token is not provided or is not valid");
  }

  const user = await UserModel.findOne({
    _id: payload.userId,
    tokens: token,
  });
  if (!user) {
    throw new Unauthorized("Token is not valid");
  }

  req.user = user;
  req.token = token;

  next();
});
