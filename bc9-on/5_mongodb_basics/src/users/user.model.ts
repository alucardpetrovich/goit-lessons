import { getModelForClass, prop } from "@typegoose/typegoose";
import { IObjectWithTypegooseFunction } from "@typegoose/typegoose/lib/types";

class User {
  @prop()
  username: string = "";

  @prop({ unique: true })
  email: string = "";

  @prop()
  password: string = "";
}
export type IUser = User &
  IObjectWithTypegooseFunction & {
    _id: any;
  };

export const UserModel = getModelForClass(User);
