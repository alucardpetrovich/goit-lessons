const serializeUser = (user) => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
};

const serializeUsers = (users) => {
  return users.map(serializeUser);
};

const serializeCurrentUser = (userRecord) => {
  return { user: serializeUser(userRecord) };
};

exports.serializeUser = serializeUser;
exports.serializeUsers = serializeUsers;
exports.serializeCurrentUser = serializeCurrentUser;
