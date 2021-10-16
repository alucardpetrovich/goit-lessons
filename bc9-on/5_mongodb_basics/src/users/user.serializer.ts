import { IUser } from "./user.model";

export function serializeUsers(userOrUsers: IUser | IUser[]) {
  if (userOrUsers instanceof Array) {
    return userOrUsers.map(serializeUser);
  }

  return serializeUser(userOrUsers);
}

function serializeUser(user: IUser) {
  return {
    id: user._id,
    email: user.email,
    username: user.username,
  };
}
