function prepareUser(user) {
  return {
    id: user._id,
    email: user.email,
    username: user.username,
  };
}

exports.prepareUser = prepareUser;
