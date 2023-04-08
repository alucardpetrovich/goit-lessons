const { getConfig } = require("../../config");

function serializeUser(user) {
  const config = getConfig();

  const userResponse = {
    id: user._id,
    username: user.username,
    phoneNumber: user.phoneNumber,
  };
  if (user.avatarPath) {
    userResponse.avatarUrl = `${config.serverBaseUrl}/${user.avatarPath}`;
  }

  return userResponse;
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
