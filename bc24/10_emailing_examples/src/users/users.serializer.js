export function composeUsers(users) {
  if (users instanceof Array) {
    return users.map(composeUser);
  }

  return composeUser(users);
}

function composeUser(user) {
  return {
    id: user._id,
    username: user.username,
    email: user.email,
  };
}
