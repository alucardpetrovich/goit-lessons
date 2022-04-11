const { serializeUser } = require("../users/users.serializers");

exports.serializeSignInResponse = (userData, token) => {
  const user = serializeUser(userData);
  return { user, token };
};
