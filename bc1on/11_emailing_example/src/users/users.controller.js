const { serializeUser } = require("./user.serializer");

exports.getCurrentUser = (req, res, next) => {
  res.status(200).send(serializeUser(req.user));
};
