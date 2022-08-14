import { User } from "./user.model";

interface UserSerialized {
  id: string;
  email: string;
  username: string;
}

export function serializeUser(user: User): UserSerialized {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
}

export function serializeSingleUserResponse(user: User) {
  return { user: serializeUser(user) };
}
