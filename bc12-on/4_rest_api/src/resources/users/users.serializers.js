function serializeUserResponse(user) {
  return { user: serializeUser(user) };
}

function serializeUsersListResponse(users) {
  return { users: users.map(serializeUser) };
}

function serializeUser(user) {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
}

exports.serializeUserResponse = serializeUserResponse;
exports.serializeUsersListResponse = serializeUsersListResponse;
exports.serializeUser = serializeUser;
