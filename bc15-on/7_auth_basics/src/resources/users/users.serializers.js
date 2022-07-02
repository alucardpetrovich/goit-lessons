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

exports.serializeUser = serializeUser;
exports.serializeUserResponse = serializeUserResponse;
