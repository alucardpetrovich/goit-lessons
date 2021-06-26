
const prepareUser = (user) => {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
  };
}

const prepareUsers = (users) => {
  return users.map(prepareUser);
}

exports.prepareUser = prepareUser;
exports.prepareUsers = prepareUsers;
