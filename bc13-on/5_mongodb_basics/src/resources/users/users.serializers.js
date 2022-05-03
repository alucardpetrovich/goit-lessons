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

exports.serializeUser = serializeUser;
exports.serializeUsers = serializeUsers;
