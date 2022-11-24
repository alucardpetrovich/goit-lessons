import { Expose, Type } from "class-transformer";
import { UserSerializer } from "./user.serializer";

export class UserResponseSerializer {
  @Expose()
  @Type(() => UserSerializer)
  user: UserSerializer = new UserSerializer();
}
