import _ from "lodash";

export function composeUsers(users) {
  const isArray = users instanceof Array;
  if (isArray) {
    return users.map((user) => _.omit(user, "password"));
  }

  return _.omit(users, "password");
}
