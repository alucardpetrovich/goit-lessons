import { Expose, Type } from "class-transformer";
import { UserSerializer } from "../../users/serializers/user.serializer";

export class SignInSerializer {
  @Expose()
  @Type(() => UserSerializer)
  user: UserSerializer = new UserSerializer();

  @Expose()
  token = "";
}
