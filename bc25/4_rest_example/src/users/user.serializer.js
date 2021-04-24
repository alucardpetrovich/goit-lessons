exports.composeUsers = function composeUsers(users) {
  if (users instanceof Array) {
    return users.map(composeUser);
  }

  return composeUser(users);
};

function composeUser(user) {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
  };
}
