import { Expose } from "class-transformer";

export class UserSerializer {
  @Expose()
  id = "";

  @Expose()
  username = "";

  @Expose()
  email = "";
}
