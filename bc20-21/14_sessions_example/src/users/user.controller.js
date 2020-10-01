exports.getLoggedUser = (req, res, next) => {
  const { username, email, id } = req.user;

  res.status(200).send({
    id,
    username,
    email,
  });
};
