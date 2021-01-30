import _ from "lodash";

export function composeUsers(users) {
  const isArray = users instanceof Array;
  if (isArray) {
    return users.map(composeUser);
  }

  return composeUser(users);
}

function composeUser(user) {
  return {
    _id: user._id,
    username: user.username,
    email: user.email,
  };
}
