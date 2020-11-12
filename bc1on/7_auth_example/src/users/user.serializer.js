exports.serializeUser = (user) => {
  return {
    id: user._id,
    email: user.email,
    username: user.username,
  };
};
