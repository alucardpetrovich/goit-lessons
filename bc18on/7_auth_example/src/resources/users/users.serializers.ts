import { User } from "./user.model";

export function serializeUser(user: User) {
  return {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export function serializeUserResponse(user: User) {
  return { user: serializeUser(user) };
}
