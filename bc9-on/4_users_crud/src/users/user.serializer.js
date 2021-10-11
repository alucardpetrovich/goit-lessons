function serializeUsers(userOrUsers) {
  if (userOrUsers instanceof Array) {
    return userOrUsers.map(serializeUser);
  }

  return serializeUser(userOrUsers);
}

function serializeUser(user) {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
  };
}

exports.serializeUsers = serializeUsers;
