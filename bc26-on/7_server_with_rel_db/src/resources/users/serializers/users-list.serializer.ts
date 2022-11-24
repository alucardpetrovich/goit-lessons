import { Expose, Type } from "class-transformer";
import { UserSerializer } from "./user.serializer";

export class UsersListSerializer {
  @Expose()
  @Type(() => UserSerializer)
  users: UserSerializer[] = [];
}
