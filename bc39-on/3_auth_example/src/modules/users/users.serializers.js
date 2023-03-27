function serializeUser(user) {
  return {
    id: user._id,
    username: user.username,
    phoneNumber: user.phoneNumber,
  };
}

function serializeUserResponse(user) {
  return { user: serializeUser(user) };
}

function serializeUsersListResponse(users) {
  return { users: users.map(serializeUser), totalRecords: users.length };
}

exports.serializeUser = serializeUser;
exports.serializeUserResponse = serializeUserResponse;
exports.serializeUsersListResponse = serializeUsersListResponse;
