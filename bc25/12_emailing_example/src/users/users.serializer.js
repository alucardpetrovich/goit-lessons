exports.serializeUsers = function (users) {
  if (!users) {
    return null;
  }

  if (users instanceof Array) {
    return users.map(serializeUser);
  }

  return serializeUser(users);
};

function serializeUser(user) {
  return {
    id: user._id,
    username: user.username,
    email: user.email,
  };
}
