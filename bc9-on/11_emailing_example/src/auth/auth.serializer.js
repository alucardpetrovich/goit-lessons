const { serializeUser } = require("../users/user.serializer");

exports.serializeUserWithToken = (userWithToken) => {
  return {
    user: serializeUser(userWithToken.user),
    token: userWithToken.token,
  };
};
