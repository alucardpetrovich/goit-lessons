function serializeUser(user) {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
  };
}

function serializeUserResponse(user) {
  return { user: serializeUser(user) };
}

function serializeUsersListResponse(users) {
  return { users: users.map(serializeUser) };
}

exports.serializeUserResponse = serializeUserResponse;
exports.serializeUsersListResponse = serializeUsersListResponse;
