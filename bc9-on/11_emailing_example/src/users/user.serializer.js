exports.serializeUser = (user) => {
  return {
    id: user.id,
    email: user.email,
    displayName: user.displayName,
  };
};
