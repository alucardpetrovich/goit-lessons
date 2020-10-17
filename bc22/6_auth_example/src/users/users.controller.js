const { usersRouter } = require("./users.router");

exports.getCurrentUser = (req, res, next) => {
  return res.status(200).send({
    id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  });
};
