import { User } from "../users/user.model";
import { serializeUser } from "../users/users.serializers";

export function serializeSignIn(user: User, token: string) {
  return { user: serializeUser(user), token };
}
